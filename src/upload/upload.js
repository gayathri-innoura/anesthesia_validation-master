import { Button, Modal, Progress, Select } from "antd";
import "../App.css";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EditOutlined,
  StarFilled,
} from "@ant-design/icons";
import image1 from "../photos/Encipher Health Logo.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MultipleViewersSamePageExample from "./PdfViewFile";
import { Option } from "antd/es/mentions";
import NewHeader from "../components/new-header";
import PatientTable from "../components/tables";
import UploadButton from "../components/upload-buttons";
import ModalPopUp from "../components/modal";
import SideDrawer from "../components/drawer";
// import Header from "../components/header/Header";

function UploadFile() {
  const [fileInfoList, setFileInfoList] = useState([]);
  const [file, setFile] = useState(null);
  const [fileID, setFileID] = useState(null);
  const [pdfFileId, setPdfFileId] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortOrder1, setSortOrder1] = useState("asc");
  const [selectedId, setSeletedId] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filename, setFileName] = useState(null);
  const [openPDF, setOpenPDF] = useState(false);
  const [pageNum, setPageNum] = useState();
  const [editedRows, setEditedRows] = useState([]);
  const [selectRowData, setSelectRowData] = useState();
  const [showPdfViewer, setShowPdfViewer] = useState(true);
  const [editMode, setEditMode] = useState(true);
  const [editedValuesRow, setEditedValuesRow] = useState();

  const handleChangeExport = (value) => {
    console.log(value);

    // Check if the selected value is 'Excel'
    if (value && value.value === "Excel") {
      handleDownload(fileID);
    }

    // Add your logic here
  };

  // const handleDownloadExport = (fileId) => {
  //   // Your logic for handling the download
  //   console.log('Downloading file with ID:', fileId);
  //   // Add the rest of your download logic here
  // };

  const handleEditClickRow = () => {
    setEditMode(true);
    const existingDiagnosis = selectRowData?.diagnosis || [];
    const existingQs = selectRowData?.qs || [];

    setEditedValuesRow({
      patientName: selectRowData?.patientName || "",
      patientId: selectRowData?.patientId || "",
      fileId: selectRowData?.fileId || "",
      pageNo: selectRowData?.pageNo || "",
      dateOfService: selectRowData?.dateOfService || "",
      anesthesiologistData: [
        {
          supervisorName:
            selectRowData?.anesthesiologistData?.[0]?.supervisorName || null,
          crnaName: selectRowData?.anesthesiologistData?.[0]?.crnaName || null,
        },
      ],
      startTime: selectRowData?.startTime || "",
      endTime: selectRowData?.endTime || "",
      timeUnit: selectRowData?.timeUnit || "",
      timeInMinutes: selectRowData?.timeInMinutes || "",
      anesthesiaType: selectRowData?.anesthesiaType || "",
      physicalModifier: selectRowData?.physicalModifier || "",
      qs: selectRowData?.qs || "",
      //qs : [...existingQs]
      asaCode: selectRowData?.asaCode || "",
      diagnosis: [...existingDiagnosis],
    });
  };
  const handleEditChangeRow = (field, value, index) => {
    setEditedValuesRow((prevValues) => {
      const prevDiagnosis = prevValues.diagnosis || [];

      if (field.startsWith("diagnosis")) {
        const updatedDiagnosis = [...prevDiagnosis];
        updatedDiagnosis[index] = value;
        return {
          ...prevValues,
          [field]: value,
          diagnosis: updatedDiagnosis,
        };
      } else if (field === "supervisorName" || field === "crnaName") {
        const updatedAnesthesiologistData =
          prevValues.anesthesiologistData?.map((item) => {
            if (field === "supervisorName") {
              return { ...item, supervisorName: value };
            } else if (field === "crnaName") {
              return { ...item, crnaName: value };
            }
            return item;
          });
        return {
          ...prevValues,
          // [field]: value,
          anesthesiologistData: updatedAnesthesiologistData,
        };
      } else {
        return {
          ...prevValues,
          [field]: value,
        };
      }
    });
  };

  const handleSaveClickRow = async () => {
    const updatedData = [...editedRows];
    updatedData[editMode] = {
      ...updatedData[editMode],
      ...editedValuesRow,
    };
    setEditedRows(updatedData);
    try {
      const response = await fetch(
        "https://anesthesia.encipherhealth.com/api/v1/patient-record/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData[editMode]),
        }
      );
      if (response.ok) {
        setSelectRowData(editedValuesRow);

        setEditMode(null);
      } else {
        console.error("Error saving data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const openPdfViewer = (pageNumber) => {
    const apiUrl = `https://anesthesia.encipherhealth.com/api/v1/file/${fileID}`;

    setPageNum(pageNumber);
    setOpenPDF(true);
    setShowPdfViewer(true);
  };
  const openPdfViewer1 = (pageNumber) => {
    const apiUrl = `https://anesthesia.encipherhealth.com/api/v1/file/${fileID}`;

    setPageNum(pageNumber);
    setOpenPDF(true);
    setShowPdfViewer(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
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
      setFileName(file?.name);
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
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchFileList = async () => {
    try {
      const response = await axios.get(
        "https://anesthesia.encipherhealth.com/api/v1/files/page?pageNo=0&pageSize=5",
      
      );

      if (response?.data) {
        const info = response?.data?.value?.content;
        console.log(info);
        const data = info.map((item) => ({id: item.fileId, name: item.originalFileName}))
        setSeletedId(data[data.length - 1].id)
        // fetchAllRecord(data[data.length - 1].id)
        if (data) {
          setFileInfoList(data)
        } else {
          setFileInfoList([])
        }
        
      }
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };
  const displatTable = async (id) => {
    try {
      if (id) {
        setFileID(id);
        const response = await axios.get(
          `https://anesthesia.encipherhealth.com/api/v1/anesthesia/${id}`
        );

        if (response?.data) {
          setData(response?.data?.value);
        }
      }
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  //list show api
  // const fetchFileList = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://anesthesia.encipherhealth.com/api/v1/files"
  //     );

  //     const data = await response.json();

  //     setFileInfoList(data);
  //   } catch (error) {
  //     console.error("Error fetching file list:", error);
  //   }
  // };
  //download api
  const handleDownload = async (fileId) => {
    const res = await axios
      .get(
        `https://anesthesia.encipherhealth.com/api/v1/patient-record/download/${fileId}`
      )
      .then((res) => res.data.value);
    console.log(res.data);
    const link = document.createElement("a");
    link.href = res.downloadUrl;
    link.setAttribute("download", "downloaded_excel.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    if (!fileInfoList.length) {
      fetchFileList();
    }
  }, []);

  // useEffect(() => {
  //   fetchFileList();
  //   // fetchDataTable();
  // }, []);
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

  const sortTableByAsc = async () => {
    try {
      const response = await axios.get(
        `https://anesthesia.encipherhealth.com/api/v1/patient-record/sort/${fileID}`,
        {
          params: {
            sortBy: "pageNo",
            order: sortOrder === "asc" ? "desc" : "asc",
          },
        }
      );
      setData(response?.data?.value); // Assuming your API returns the sorted data
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  };
  const sortTableByAsc1 = async () => {
    try {
      const response = await axios.get(
        `https://anesthesia.encipherhealth.com/api/v1/patient-record/sort/${fileID}`,
        {
          params: {
            sortBy: "qs",
            order: sortOrder1 === "asc" ? "desc" : "asc",
          },
        }
      );
      setData(response?.data?.value); // Assuming your API returns the sorted data
      setSortOrder1(sortOrder1 === "asc" ? "desc" : "asc");
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  };
  // const tableShow = ()=>{
  //   setFileID(fileInfoList[fileInfoList?.length - 1]?.fileId)
  // }

  const replaceValues = (patientId, editedValuesRow) => {
    setData((prevDatas) => {
      return prevDatas
        ? prevDatas.map((data) => {
            if (data.patientId === patientId) {
              return editedValuesRow;
            }
            return data;
          })
        : prevDatas;
    });
  };
  

  const fetchAllRecord = async(id) => {
    try {
      if (id) {
        setFileID(id);
        const response = await axios.get(
          `https://anesthesia.encipherhealth.com/api/v1/anesthesia/${id}`
        );

        if (response?.data) {
          setData(response?.data?.value);
        }
      }
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  }


  useEffect(() => {
    console.log(selectedId);
    if (selectedId) {
      fetchAllRecord('722469b9-ad7e-4037-a91e-f861585ea77b')
    }
  }, [selectedId])

  return (
    <div>
      {/*    */}
      <NewHeader />'
      <div className="my-2">
        <UploadButton fileID={fileID} setOpen={setOpen} selectedId={selectedId} />
      </div>
      <PatientTable data={data} setData={setData} selectedId={selectedId}/>
      <ModalPopUp
        openPDF={openPDF}
        showPdfViewer={showPdfViewer}
        replaceValues={replaceValues}
        setOpenPDF={setOpenPDF}
        selectRowData={selectRowData}
        editedValuesRow={editedValuesRow}
        editMode={editMode}
        handleEditChangeRow={handleEditChangeRow}
        handleEditClickRow={handleEditClickRow}
        setEditMode={setEditMode}
        handleSaveClickRow={handleSaveClickRow}
        fileID={fileID}
        pageNum={pageNum}
      />
      <SideDrawer
        open={open}
        setOpen={setOpen}
        setSeletedId={setSeletedId}
        list={fileInfoList}
      />
    </div>
  );
}

export default UploadFile;

// const handleUpload = async () => {
//   if (!file) {
//     console.error("No file selected");
//     return;
//   }

//   // Upload API
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     setProgress(1);
//     const response = await axios.post(
//       "https://anesthesia.encipherhealth.com/api/v1/fileUpload",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (response.data === "File uploaded successfully ") {
//       setProgress(100);
//       const uploadedFileId = response.data.fileId; // Adjust this based on the actual response structure
//       setFileID(uploadedFileId);
//       fetchFileList(); // This might not be necessary, depending on your use case
//     }

//     console.log(response.data);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//   }
// };
