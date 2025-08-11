import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Typography,
  Space,
} from "antd";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const { Title } = Typography;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  const categoriesCollection = collection(db, "categories");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      categoriesCollection,
      (snapshot) => {
        const cats = snapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        }));
        setCategories(cats);
        setLoading(false);
      },
      (error) => {
        message.error("Failed to load categories: " + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const openModal = (record = null) => {
    setEditingCategory(record);
    if (record) {
      form.setFieldsValue({ name: record.name });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const categoryData = {
        name: values.name.trim(),
        updatedAt: serverTimestamp(),
      };

      if (editingCategory) {
        const docRef = doc(db, "categories", editingCategory.key);
        await updateDoc(docRef, categoryData);
        message.success("Category updated successfully");
      } else {
        categoryData.createdAt = serverTimestamp();
        await addDoc(categoriesCollection, categoryData);
        message.success("Category added successfully");
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingCategory(null);
    } catch (error) {
      message.error("Failed to save category: " + error.message);
    }
  };

  const handleDelete = async (key) => {
    try {
      await deleteDoc(doc(db, "categories", key));
      message.success("Category deleted successfully");
    } catch (error) {
      message.error("Failed to delete category: " + error.message);
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
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
            title="Are you sure to delete this category?"
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
        Categories
      </Title>

      <Button
        type="primary"
        onClick={() => openModal()}
        style={{ marginBottom: 16 }}
      >
        Add Category
      </Button>

      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        pagination={{ pageSize: 5, showSizeChanger: false }}
        bordered
      />

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText="Save"
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please enter category name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
