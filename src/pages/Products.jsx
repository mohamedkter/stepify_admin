import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Typography,
  Image,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Popconfirm,
  message,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

const { Title } = Typography;
const { Option } = Select;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [colorImages, setColorImages] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState([{ size: null, quantity: null }]);

  const [form] = Form.useForm();

  const productsCollection = collection(db, "products");
  const categoriesCollection = collection(db, "categories");

  // Fetch products realtime
  useEffect(() => {
    setLoading(true);
    const q = query(productsCollection);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const prods = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            key: doc.id,
            ...data,
            createdAt:
              data.createdAt && data.createdAt.seconds
                ? data.createdAt.toDate()
                : null,
            updatedAt:
              data.updatedAt && data.updatedAt.seconds
                ? data.updatedAt.toDate()
                : null,
          };
        });
        setProducts(prods);
        setLoading(false);
      },
      (error) => {
        message.error("Failed to load products: " + error.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch categories realtime
  useEffect(() => {
    const unsubscribe = onSnapshot(
      categoriesCollection,
      (snapshot) => {
        const cats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(cats);
      },
      (error) => {
        message.error("Failed to load categories: " + error.message);
      }
    );
    return () => unsubscribe();
  }, []);

  // Upload image to Cloudinary
  async function uploadImageToCloudinary(file) {
    const url = `https://api.cloudinary.com/v1_1/df9t7gfyb/image/upload`;
    const preset = "signed_preset";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      }
      throw new Error("Upload failed");
    } catch (error) {
      message.error("Image upload failed: " + error.message);
      return null;
    }
  }

  const openModal = (record = null) => {
    setEditingProduct(record);
    if (record) {
      form.setFieldsValue({
        name: record.name,
        brand: record.brand,
        category: record.category,
        description: record.description,
        price: record.price,
        discount: record.discount || 0,
        rating: record.rating || 0,
        stockStatus: record.stockStatus || "In Stock",
        tags: record.tags ? record.tags.join(", ") : "",
      });
      setColorImages(record.colorImages || []);
      if (record.sizeQuantities) {
        setSizeQuantities(
          Object.entries(record.sizeQuantities).map(([size, quantity]) => ({
            size: Number(size),
            quantity,
          }))
        );
      } else {
        setSizeQuantities([{ size: null, quantity: null }]);
      }
    } else {
      form.resetFields();
      setColorImages([]);
      setSizeQuantities([{ size: null, quantity: null }]);
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (colorImages.length === 0) {
        message.error("Please upload at least one color image");
        return;
      }

      const sizeQuantitiesObj = {};
      sizeQuantities.forEach(({ size, quantity }) => {
        if (size != null && quantity != null) sizeQuantitiesObj[size] = quantity;
      });

      const productData = {
        ...values,
        tags: values.tags ? values.tags.split(",").map((t) => t.trim()) : [],
        colorImages,
        sizeQuantities: sizeQuantitiesObj,
        createdAt: editingProduct ? editingProduct.createdAt : serverTimestamp(),
        updatedAt: serverTimestamp(),
        inStock: values.stockStatus === "In Stock",
        stockStatus: values.stockStatus,
        image: colorImages[0].image,
      };

      if (editingProduct) {
        const docRef = doc(db, "products", editingProduct.key);
        await updateDoc(docRef, productData);
        message.success("Product updated successfully");
      } else {
        await addDoc(productsCollection, productData);
        message.success("Product added successfully");
      }

      setIsModalOpen(false);
      form.resetFields();
      setColorImages([]);
      setSizeQuantities([{ size: null, quantity: null }]);
    } catch (error) {
      message.error("Failed to save product: " + error.message);
    }
  };

  const handleDelete = async (key) => {
    try {
      await deleteDoc(doc(db, "products", key));
      message.success("Product deleted successfully");
    } catch (error) {
      message.error("Failed to delete product: " + error.message);
    }
  };

  const handleAddColorImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingImages(true);
    const uploadedUrl = await uploadImageToCloudinary(file);
    setUploadingImages(false);

    if (uploadedUrl) {
      const colorName = prompt("Enter color name for this image:");
      if (!colorName) {
        message.error("Color name is required");
        return;
      }
      setColorImages((prev) => [...prev, { name: colorName, image: uploadedUrl }]);
    }
  };

  const handleSizeQuantityChange = (index, field, value) => {
    const newSizeQuantities = [...sizeQuantities];
    newSizeQuantities[index][field] = value;
    setSizeQuantities(newSizeQuantities);
  };

  const addSizeQuantityField = () => {
    setSizeQuantities((prev) => [...prev, { size: null, quantity: null }]);
  };

  const removeSizeQuantityField = (index) => {
    if (sizeQuantities.length === 1) return;
    const newSizeQuantities = sizeQuantities.filter((_, i) => i !== index);
    setSizeQuantities(newSizeQuantities);
  };

  const columns = [
    {
      title: "Main Image",
      dataIndex: "image",
      key: "image",
      render: (img) => <Image src={img} alt="Product" width={50} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${parseFloat(price).toFixed(2)}`,
    },
    {
      title: "Stock Status",
      dataIndex: "stockStatus",
      key: "stockStatus",
      render: (stock) => {
        let color;
        switch (stock) {
          case "In Stock":
            color = "green";
            break;
          case "Low Stock":
            color = "gold";
            break;
          case "Out of Stock":
            color = "red";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{stock}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Products
      </Title>

      <Button
        type="primary"
        onClick={() => openModal()}
        style={{ marginBottom: 16 }}
      >
        Add Product
      </Button>

      <Table
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 5, showSizeChanger: false }}
        bordered
        loading={loading}
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText="Save"
        destroyOnClose
        width={800}
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: "Please enter brand" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category" allowClear>
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.name}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: "Please enter product price" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="discount"
            label="Discount (%)"
            rules={[{ type: "number", min: 0, max: 100 }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ type: "number", min: 0, max: 5 }]}
          >
            <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="stockStatus"
            label="Stock Status"
            rules={[{ required: true, message: "Please select stock status" }]}
          >
            <Select>
              <Option value="In Stock">In Stock</Option>
              <Option value="Low Stock">Low Stock</Option>
              <Option value="Out of Stock">Out of Stock</Option>
            </Select>
          </Form.Item>

          {/* Color Images */}
          <Form.Item label="Color Images">
            <input
              type="file"
              accept="image/*"
              onChange={handleAddColorImage}
              disabled={uploadingImages}
            />
            {uploadingImages && <div>Uploading image...</div>}
            <div style={{ marginTop: 10 }}>
              {colorImages.map(({ name, image }, idx) => (
                <Tag
                  key={idx}
                  closable
                  onClose={() => {
                    setColorImages((prev) => prev.filter((_, i) => i !== idx));
                  }}
                >
                  {name}
                  <img
                    src={image}
                    alt={name}
                    style={{ width: 30, height: 30, marginLeft: 8, borderRadius: 4 }}
                  />
                </Tag>
              ))}
            </div>
          </Form.Item>

          {/* Sizes & Quantities */}
          <Form.Item label="Sizes & Quantities">
            {sizeQuantities.map((sq, index) => (
              <Space key={index} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                <InputNumber
                  placeholder="Size"
                  min={30}
                  max={50}
                  value={sq.size}
                  onChange={(val) => handleSizeQuantityChange(index, "size", val)}
                />
                <InputNumber
                  placeholder="Quantity"
                  min={0}
                  value={sq.quantity}
                  onChange={(val) => handleSizeQuantityChange(index, "quantity", val)}
                />
                {sizeQuantities.length > 1 && (
                  <Button danger onClick={() => removeSizeQuantityField(index)}>
                    Remove
                  </Button>
                )}
              </Space>
            ))}
            <Button type="dashed" onClick={addSizeQuantityField} icon={<PlusOutlined />}>
              Add Size
            </Button>
          </Form.Item>

          <Form.Item name="tags" label="Tags (comma separated)">
            <Input placeholder="e.g. sports, casual, summer" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
