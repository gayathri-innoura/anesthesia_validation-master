import React from "react";
import MultipleViewersSamePageExample from "../../upload/PdfViewFile";
import { Button, Modal } from "antd";

const ModalPopUp = ({
    openPDF,
    showPdfViewer,
    replaceValues,
    setOpenPDF,
    selectRowData,
    editedValuesRow,
    editMode,
    handleEditChangeRow,
    handleEditClickRow,
    setEditMode,
    handleSaveClickRow,
    fileID,
    pageNum
}) => {
  return (
    <div>
      <Modal
        open={openPDF}
        onOk={() => {
          replaceValues(selectRowData?.patientId, editedValuesRow);
          setOpenPDF(false);
        }}
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

          {showPdfViewer && (
            <div
              style={{
                width: "30%",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#E4E7E7",
              }}
            >
              {selectRowData && (
                <div c>
                  <h4>Selected Row Data</h4>
                  <div></div>

                  <div class="values">
                    <div>Patient Name</div>

                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.patientName}
                        onChange={(e) =>
                          handleEditChangeRow("patientName", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData.patientName}</div>
                    )}

                    <div>Page No</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.pageNo}
                        onChange={(e) =>
                          handleEditChangeRow("pageNo", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.pageNo}</div>
                    )}
                    <div>DOS</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.dateOfService}
                        onChange={(e) =>
                          handleEditChangeRow("dateOfService", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.dateOfService}</div>
                    )}
                    <div>Anesthesiologist</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={
                          editedValuesRow?.anesthesiologistData?.[0]
                            ?.supervisorName
                        }
                        onChange={(e) =>
                          handleEditChangeRow("supervisorName", e.target.value)
                        }
                      />
                    ) : (
                      <div>
                        {/* {
                            selectRowData?.anesthesiologistData?.[0]
                              ?.supervisorName
                          } */}
                        {selectRowData?.anesthesiologistData
                          ?.map((item) => item.supervisorName)
                          ?.join(", ")}
                      </div>
                    )}
                    <div>CRNA</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={
                          editedValuesRow?.anesthesiologistData?.[0]?.crnaName
                        }
                        onChange={(e) =>
                          handleEditChangeRow("crnaName", e.target.value)
                        }
                      />
                    ) : (
                      <div>
                        {/* {selectRowData?.anesthesiologistData?.[0]?.crnaName} */}
                        {selectRowData?.anesthesiologistData
                          ?.map((item) => item.crnaName)
                          ?.join(", ")}
                      </div>
                    )}
                    <div>Start Time</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.startTime}
                        onChange={(e) =>
                          handleEditChangeRow("startTime", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.startTime}</div>
                    )}
                    <div>End Time</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.endTime}
                        onChange={(e) =>
                          handleEditChangeRow("endTime", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.endTime}</div>
                    )}
                    <div>Time Unit</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.timeUnit}
                        onChange={(e) =>
                          handleEditChangeRow("timeUnit", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.timeUnit}</div>
                    )}
                    <div>Total time in Minutes</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.timeInMinutes}
                        onChange={(e) =>
                          handleEditChangeRow("timeInMinutes", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.timeInMinutes}</div>
                    )}
                    <div>Anesthesia Type</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.anesthesiaType}
                        onChange={(e) =>
                          handleEditChangeRow("anesthesiaType", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.anesthesiaType}</div>
                    )}
                    <div>Physical Modifier</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.physicalModifier}
                        onChange={(e) =>
                          handleEditChangeRow(
                            "physicalModifier",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <div>{selectRowData?.physicalModifier}</div>
                    )}
                    <div>Modifier</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.qs}
                        onChange={(e) =>
                          handleEditChangeRow("qs", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.qs}</div>
                    )}
                    <div>ASA</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.asaCode}
                        onChange={(e) =>
                          handleEditChangeRow("asaCode", e.target.value)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.asaCode}</div>
                    )}
                    <div>Diagnosis 1</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.diagnosis[0]}
                        onChange={(e) =>
                          handleEditChangeRow("diagnosis", e.target.value, 0)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.diagnosis[0]}</div>
                    )}

                    <div>Diagnosis 2</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.diagnosis[1]}
                        onChange={(e) =>
                          handleEditChangeRow("diagnosis", e.target.value, 1)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.diagnosis[1]}</div>
                    )}

                    <div>Diagnosis 3</div>

                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.diagnosis[2]}
                        onChange={(e) =>
                          handleEditChangeRow("diagnosis", e.target.value, 2)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.diagnosis[2]}</div>
                    )}

                    <div>Diagnosis 4</div>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedValuesRow?.diagnosis[3]}
                        onChange={(e) =>
                          handleEditChangeRow("diagnosis", e.target.value, 3)
                        }
                      />
                    ) : (
                      <div>{selectRowData?.diagnosis[3]}</div>
                    )}

                    {!editMode && (
                      <Button
                        className="editButton"
                        onClick={handleEditClickRow}
                      >
                        Edit
                      </Button>
                    )}

                    {editMode && (
                      <>
                        <Button onClick={handleSaveClickRow}>Save</Button>
                        <Button onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalPopUp;
