import React, { useState } from "react";

function FormToSheet() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    company: "",
    phone: "",
    jobtitle: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const url =
      "https://script.google.com/macros/s/AKfycbw5YR_2dJwiAx30bo3i0O_dkGGOGDC_gsty2msJiGFbAYBz4ME_usfG3K-z6y4ZUsWT/exec";

    const urlParams = new URLSearchParams();
    urlParams.append("FirstName", formData.firstname);
    urlParams.append("LastName", formData.lastname);
    urlParams.append("Email", formData.email);
    urlParams.append("CompanyName", formData.company);
    urlParams.append("PhoneNumber", formData.phone);
    urlParams.append("JobTitle", formData.jobtitle);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: urlParams,
        redirect: "follow",
      });

      const data = await response.json();

      if (data.result === "success") {
        setMessage("✅ เพิ่มข้อมูลสำเร็จ!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          company: "",
          phone: "",
          jobtitle: "",
        });
      } else {
        setMessage("❌ เกิดข้อผิดพลาด: " + data.message);
      }
    } catch (error) {
      console.log("Trying alternative method...");

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.name = "hidden-form";
      document.body.appendChild(iframe);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;
      form.target = "hidden-form";

      const fields = [
        { name: "FirstName", value: formData.firstname },
        { name: "LastName", value: formData.lastname },
        { name: "Email", value: formData.email },
        { name: "CompanyName", value: formData.company },
        { name: "PhoneNumber", value: formData.phone },
        { name: "JobTitle", value: formData.jobtitle },
      ];

      fields.forEach((field) => {
        const input = document.createElement("input");
        input.name = field.name;
        input.value = field.value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      setMessage("✅ ส่งข้อมูลแล้ว (กรุณาตรวจสอบใน Google Sheet)");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        company: "",
        phone: "",
        jobtitle: "",
      });

      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "50px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
        แบบฟอร์มลงทะเบียน
      </h1>

      <div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            ชื่อ (First Name) <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="กรอกชื่อ"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            นามสกุล (Last Name) <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="กรอกนามสกุล"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            อีเมล (Email) <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="example@email.com"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            ชื่อบริษัท (Company Name) <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            type="text"
            placeholder="กรอกชื่อบริษัท"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            เบอร์โทรศัพท์ (Phone Number) <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            placeholder="0812345678"
            required
            pattern="[0-9]{9,10}"
            title="กรุณากรอกเบอร์โทรศัพท์ 9-10 หลัก"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            ตำแหน่งงาน (Job Title) <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="jobtitle"
            value={formData.jobtitle}
            onChange={handleChange}
            type="text"
            placeholder="กรอกตำแหน่งงาน"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 20px",
            cursor: loading ? "not-allowed" : "pointer",
            backgroundColor: loading ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          {loading ? "⏳ กำลังส่งข้อมูล..." : "📝 ส่งข้อมูล"}
        </button>
      </div>

      {message && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
            color: message.includes("✅") ? "#155724" : "#721c24",
            borderRadius: "4px",
            border: `1px solid ${
              message.includes("✅") ? "#c3e6cb" : "#f5c6cb"
            }`,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default FormToSheet;
