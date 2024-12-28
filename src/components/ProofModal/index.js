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

    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Chỉ chấp nhận tệp PDF.");
      setFile(null);
      setFileName(null);
    } else {
      setError("");
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUploadProof = async () => {
    if (!file) {
      alert("Vui lòng chọn tệp PDF để tải lên");
      setError("Vui lòng chọn tệp PDF để tải lên.");
      return;
    }

    try {
      const newProof = await uploadProof(file, data._id);
      if (newProof && typeof newProof === 'object') {
        alert("Upload proof success");
        setModal(false);
      }
      else if (newProof && typeof newProof !== 'object') {
        alert(newProof);
      }
      else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } catch (err) {
      alert("Lỗi khi tải lên bằng chứng:", err);
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
      <Button primary disabled={disabled} onClick={toggleModal}>
        {children}
      </Button>

      {modal && (
        <div className={cx("modal")}>
          <div onClick={toggleModal} className={cx("overlay")}></div>
          <form className={cx("modal-content")} onSubmit={(e) => e.preventDefault()}>
            <div className={cx("modal-field-container")}>
              <div className={cx("input-file-container")}>
                    <input
                      type="file"
                      className={cx("file-picker")}
                      accept=".pdf"
                      onChange={handleFileChange}
                    ></input>
              </div>
              
                <Button submitTwo onClick={handleUploadProof}>
                  Tải lên
                </Button>
              
            </div>
          </form>
        </div>
      )}
    </>
  );
}
