import React, { useState } from "react";

function FormToSheet() {
  // ---------------------------------------------------------
  // ส่วน Logic เดิมของเฮีย (ห้ามแตะต้องตามคำสั่งครับ)
  // ---------------------------------------------------------
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
  // ---------------------------------------------------------
  // จบส่วน Logic
  // ---------------------------------------------------------

  return (
    <>
      {/* ฝัง CSS ลงไปเลยเพื่อให้ Copy ไปใช้ได้ทันที */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap');

        .form-wrapper {
          min-height: 100vh;
          background: #f0f2f5;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: 'Kanit', sans-serif;
        }

        .form-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 500px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .form-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(90deg, #4CAF50, #00C853);
        }

        .form-title {
          text-align: center;
          color: #2c3e50;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #4a5568;
          font-size: 15px;
        }

        .required-star {
          color: #e53e3e;
          margin-left: 4px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          background-color: #f8fafc;
          transition: all 0.3s ease;
          box-sizing: border-box;
          font-family: 'Kanit', sans-serif;
        }

        .form-input:focus {
          border-color: #4CAF50;
          background-color: #ffffff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }

        .form-input::placeholder {
          color: #a0aec0;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 10px;
          font-family: 'Kanit', sans-serif;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(46, 125, 50, 0.2);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }

        .message-box {
          margin-top: 25px;
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          font-weight: 500;
          animation: fadeIn 0.5s ease;
        }

        .msg-success {
          background-color: #f0fff4;
          color: #276749;
          border: 1px solid #c6f6d5;
        }

        .msg-error {
          background-color: #fff5f5;
          color: #c53030;
          border: 1px solid #fed7d7;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="form-wrapper">
        <div className="form-card">
          <h1 className="form-title">แบบฟอร์มลงทะเบียน</h1>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">
                ชื่อ (First Name) <span className="required-star">*</span>
              </label>
              <input
                className="form-input"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                type="text"
                placeholder="กรอกชื่อจริง"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                นามสกุล (Last Name) <span className="required-star">*</span>
              </label>
              <input
                className="form-input"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                type="text"
                placeholder="กรอกนามสกุล"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                อีเมล (Email) <span className="required-star">*</span>
              </label>
              <input
                className="form-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                ชื่อบริษัท (Company Name) <span className="required-star">*</span>
              </label>
              <input
                className="form-input"
                name="company"
                value={formData.company}
                onChange={handleChange}
                type="text"
                placeholder="ระบุชื่อบริษัทของคุณ"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                เบอร์โทรศัพท์ (Phone) <span className="required-star">*</span>
              </label>
              <input
                className="form-input"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="0812345678"
                pattern="[0-9]{9,10}"
                title="กรุณากรอกเบอร์โทรศัพท์ 9-10 หลัก"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                ตำแหน่งงาน (Job Title) <span className="required-star">*</span>
              </label>
              <input
                className="form-input"
                name="jobtitle"
                value={formData.jobtitle}
                onChange={handleChange}
                type="text"
                placeholder="ระบุตำแหน่งงาน"
                required
              />
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span>
                  <i className="fas fa-circle-notch fa-spin"></i> กำลังบันทึก...
                </span>
              ) : (
                "บันทึกข้อมูล"
              )}
            </button>
          </form>

          {message && (
            <div
              className={`message-box ${
                message.includes("✅") ? "msg-success" : "msg-error"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FormToSheet;