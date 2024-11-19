import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProofModal.module.scss";
import Button from "../Button";
import useAccount from "../../hook/useAccount";

const cx = classNames.bind(styles);

export default function ProofModal({ children, disabled = false, data }) {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileProof, setFileProof] = useState(data?.proof || null);
  const [error, setError] = useState("");
  const [checkLogin, signUp, loadingAccount, doctorsHook, getAccountByID, filterDoctorList, getAccountByEmail, checkAccountType, uploadProof] = useAccount();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Kiểm tra loại tệp
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Chỉ chấp nhận tệp PDF.");
      setFile(null); // Xóa file nếu không hợp lệ
      setFileName(null);
    } else {
      setError("");
      setFile(selectedFile);
      setFileName(selectedFile.name); // Lưu tên tệp để hiển thị
    }
  };

  const handleUploadProof = async () => {
    if (!file) {
      console.log("Vui lòng chọn tệp PDF để tải lên");
      setError("Vui lòng chọn tệp PDF để tải lên.");
      return;
    }

    try {
      console.log("Proof User ID: ", data._id);
      await uploadProof(file, data._id);
      console.log("Upload proof success");
      setModal(false); // Đóng modal sau khi tải lên thành công
    } catch (err) {
      console.error("Lỗi khi tải lên bằng chứng:", err);
      setError("Có lỗi xảy ra khi tải lên.");
    }
  };

  const toggleModal = () => {
    if (disabled) return;
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <Button primary onClick={toggleModal}>
        {children}
      </Button>

      {modal && (
        <div className={cx("modal")}>
          <div onClick={toggleModal} className={cx("overlay")}></div>
          <form className={cx("modal-content")} onSubmit={(e) => e.preventDefault()}>
            <div className={cx("modal-field-container")}>
              <div className={cx("input-file-container")}>
                {fileProof ? (
                  // Nếu tệp đã tồn tại, hiển thị thông báo không thể thay đổi
                  <p className={cx("file-name")}>
                    Tệp hiện tại: <strong>{fileProof}</strong> (Không thể thay đổi)
                  </p>
                ) : (
                  // Nếu chưa có tệp, cho phép người dùng tải lên
                  <>
                    <input
                      type="file"
                      className={cx("file-picker")}
                      accept=".pdf" // Chỉ chấp nhận file PDF
                      onChange={handleFileChange}
                      disabled={!!fileName} // Vô hiệu hóa nếu fileName đã tồn tại
                    />
                    {error && <p className={cx("error-message")}>{error}</p>}
                  </>
                )}
              </div>
              {!fileName && (
                <Button submitTwo onClick={handleUploadProof}>
                  Tải lên
                </Button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
