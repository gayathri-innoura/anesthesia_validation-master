import { Button, Modal, Progress, Select, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Option } from "antd/es/mentions";
import MultipleViewersSamePageExample from "../../upload/PdfViewFile";
import {Drawer, Radio, Space } from 'antd';
import { CloseCircleOutlined } from "@ant-design/icons";

const UploadButton = ({fileID, setSeletedId, setData, selectedId, setSelectedFileName,
  selectedFileName}) => {
  const [openPDF, setOpenPDF] = useState(false);
  const [pageNum, setPageNum] = useState();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [showPdfViewer, setShowPdfViewer] = useState(true);
  //   const [fileID, setFileID] = useState(null);
  
  const openPdfViewer1 = (pageNumber) => {
    const apiUrl = `https://anesthesia.encipherhealth.com/api/v1/file/${fileID}`;

    setPageNum(pageNumber);
    setOpenPDF(true);
    // setShowPdfViewer(false);
  };
  const handleChangeExport = (value) => {
    console.log(value);

    // Check if the selected value is 'Excel'
    if (value && value.value === "Excel") {
      handleDownload(fileID);
    }

    // Add your logic here
  };
  const handleDownload = async () => {
    const res = await axios
      .get(
        `https://anesthesia.encipherhealth.com/api/v1/patient-record/download/${selectedId}`
      )
      .then((res) => res.data.value);
    console.log(selectedId, "test");
    const link = document.createElement("a");
    link.href = res.downloadUrl;
    link.setAttribute("download", "downloaded_excel.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    // fetchFileList();
    //progress bar function
    if (progress > 0) {
      const intervalId = setInterval(() => {
        if (progress >= 99) {
          clearInterval(intervalId); // Clear the interval when progress reaches 99
        } else {
          setProgress(progress + 1);
        }
      }, 500);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [progress]);

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    //upload api
    try {
      const formData = new FormData();
      formData.append("file", file);
      //   setFileName(file?.name);
      setProgress(1);
      const response = await axios.post(
        "https://anesthesia.encipherhealth.com/api/v1/fileUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        setProgress(100);
        // fetchFileList();
        setSeletedId(response?.data?.value?.fileId)
        // setSelectedFileName(response?.data?.value?.originalFileName)
        setSelectedFileName(file?.name)

      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 3000);
    }
  }, [progress]);
  
  return (
    <div className="d-flex justify-content-between mx-3 my-4">
      {selectedFileName ? <div className="d-flex border px-5" style={{alignItems: 'center'}}>
       <h5 className="p-2 mt-2 ">{selectedFileName}</h5>
        <button
            type="button"
            className="btn btn-outline-danger p-1 px-2"
            height="90px"
            onClick={() => {setSelectedFileName(''); setData([]); setSeletedId('')}}
          >
           <CloseCircleOutlined />
          </button>
      </div> : 
      <div>
        <form action="/action_page.php" style={{ height: "36px" }}>
          <input
            type="file"
            id="myFile"
            name="filename"
            placeholder="Upload PDF"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          <button
            type="button"
            className="btn btn-outline py-1 px-3 custom-btn"
            height="90px"
            onClick={handleUpload}
          >
            Submit
          </button>
        </form>
        {progress > 0 && (
          <Progress
            percent={progress}
            status="active"
            style={{ marginTop: "9px", height: "20px" }}
            // strokeWidth={18}
          />
        )}
      </div>
      }
      <div className="pdfView">
        <div>
          {" "}
          <Button className="button1" onClick={openPdfViewer1}>
            PDF
          </Button>
        </div>

        {/* <Select
              labelInValue
              defaultValue={{
                value: "Export",
                label: "Export",
              }}
              style={{
                width: 100,
              }}
              className='dropDown'
              onChange={handleChangeExport}
            >
              <Option   className='dropDown' value="Excel">Excel</Option>
              <Option value="CSV">Csv</Option>
            </Select> */}
        <div style={{ marginRight: "40px" }}>
          {/* <select class="form-select" aria-label="Default select example" style={{width: "84px", height: "33px", backgroundColor:"#2E6B4C", border:"1px solid #2E6B4C"}}   
    >
  <option selected>Export</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select> */}
          <Select
            labelInValue
            defaultValue={{
              value: "Export",
              label: "Export",
            }}
            style={{
              width: 100,
            }}
            className="dropDown"
            onChange={handleChangeExport}
          >
            <Option className="dropDown" value="Excel">
              Excel
            </Option>
            <Option value="CSV">Csv</Option>
          </Select>
        </div>
        {openPDF && (
        <Modal
          open={openPDF}
          //   onOk={() => {
          //     replaceValues(selectRowData?.patientId, editedValuesRow);
          //     setOpenPDF(false);
          //   }}
          onCancel={() => setOpenPDF(false)}
          style={{ marginTop: "-50px" }}
          width="90%"
          height="auto"
        >
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "100%" }}>
              <MultipleViewersSamePageExample
                fileID={fileID}
                pageNumber={pageNum}
              />
            </div>
          </div>
        </Modal>
        )}
      </div>
    </div>
  );
};

export default UploadButton;
