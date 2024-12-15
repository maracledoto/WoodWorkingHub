import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profile_get_route, profile_update_route } from "../api/routes";
import { Card, Input, Button, Form, message, Upload } from "antd";
import { ArrowLeftOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [authRes, setAuthRes] = useState(null);
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    address: "",
    phone: "",
    skills: "", // New state for skills
    profilePicture: "", // State for profile picture
  });

  const handleBackButton = () => navigate("/products");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handlePictureUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        message.success("Profile picture uploaded successfully!");
        setProfile({ ...profile, profilePicture: data.url }); // Update profile with image URL
      } else {
        message.error(data.message || "Failed to upload profile picture.");
      }
    } catch (error) {
      message.error("Error uploading profile picture.");
      console.error(error); // Log the error for debugging
    }
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(profile_update_route, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) {
        message.success("Profile updated successfully!");
        setAuthRes(null);
      } else {
        setAuthRes(data.message || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      setAuthRes("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(profile_get_route, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setProfile({
            email: data.email || "",
            name: data.name || "",
            address: data.address || "",
            phone: data.phone || "",
            skills: data.skills || "", // Load skills from the fetched profile
            profilePicture: data.profilePicture || "", // Load profile picture
          });
        } else {
          setAuthRes("Failed to fetch profile. Please try again.");
        }
      } catch (error) {
        setAuthRes("Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="single-container">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackButton}
          className="back"
        >
          Back to Products
        </Button>
        <Card
          style={{
            maxWidth: 1000,
            width: 600,
            margin: "0 auto",
            marginTop: 20,
          }}
          title="Your Profile"
        >
          <Form layout="vertical" onFinish={handleEdit} className="formWidth">
            <Form.Item label="">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                  src={profile.profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  style={{ width: 150, height: 150, borderRadius: "50%", marginBottom: 10 }}
                />
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handlePictureUpload(file);
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload Picture</Button>
                </Upload>
              </div>
            </Form.Item>

            <Form.Item label="Email">
              <Input
                type="email"
                name="email"
                value={profile.email}
                disabled
                size="large"
              />
            </Form.Item>
            <Form.Item label="Name">
              <Input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputs}
                placeholder="Your Name"
                size="large"
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputs}
                placeholder="Your Address"
                size="large"
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputs}
                placeholder="Your Phone"
                size="large"
              />
            </Form.Item>
            <Form.Item label="Skills">
              <Input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleInputs}
                placeholder="List your skills"
                size="large"
              />
            </Form.Item>
            {authRes && <p style={{ color: "red" }}>{authRes}</p>}
            <Button type="primary" htmlType="submit" icon={<EditOutlined />} block>
              Update Profile
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Profile;
