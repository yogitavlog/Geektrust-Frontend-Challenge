import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSnackbar } from "notistack";
import Header from "./Header";
import DataTable from "./DataTable";
import "./geektrust.css";

const Geektrust = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [editRowId, setEditRowId] = useState(null)
    const [editRowData, setEditRowData] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    });


    useEffect(() => {
        getTableData();
    }, [])

    // handling the pagination
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    // Getting Rows data on API call
    const getTableData = async () => {
        try {
            const res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            // console.log(res.data);
            setRows(res.data);
            setSearchList(res.data);
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    //Perfrom Search to get the specific person by name, email or role
    const performSearch = (text) => {
        console.log(text)
        if (text === "") {
            setSearchList(rows);
        }
        let searchName = rows.filter((ele) => {
            console.log(ele.name.includes(text))
            return ele.name.includes(text)
        })

        let searchEmail = rows.filter((ele) => {
            console.log(ele.email.includes(text))
            return ele.email.includes(text)
        })

        let searchRole = rows.filter((ele) => {
            console.log(ele.role.includes(text))
            return ele.role.includes(text)
        })
        if (searchName.length > 0)
            setSearchList(searchName);
        if (searchEmail.length > 0)
            setSearchList(searchEmail);
        if (searchRole.length > 0)
            setSearchList(searchRole);
    };

    // Select all the checkboxes at once
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            let newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            console.log(newSelecteds)
            return;
        }
        setSelected([]);


    };

    // select the particular row by click on every checkbox
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);

    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Deleted all the selected rows
    const deleteAllSelectedRows = (selected, rows) => {
        console.log(selected);
        const newList = rows.filter((obj) => {
            return selected.indexOf(obj.id) === -1;
        });
        setRows(newList);
        setSearchList(newList);
    }

    //delete single row
    const deleteSelectedRow = (event, id) => {
        event.stopPropagation();
        const newList = rows.filter((ele) => {
            return ele.id !== id;
        });
        console.log(newList);
        setRows(newList);
        setSearchList(newList);
    }

    //Edit row data
    const onEdit = (event, row) => {
        console.log(row.id)
        event.preventDefault();
        setEditRowId(row.id);

        const RowDataValues = {
            id: row.id,
            name:  row.name,
            email: row.email,
            role: row.role
        }
        console.log(RowDataValues);
        setEditRowData(RowDataValues);
    }

    // Handling the Edit Row data
    const handleEditrowChange = (event) => {
        event.preventDefault()
        const key = event.target.name;
        const value = event.target.value;
        setEditRowData({ ...editRowData, [key]: value })
    };

    //Validating the row data before save
    const validateInput = (rowData) => {
        if (!rowData.name) {
            enqueueSnackbar("Name is a required", {
                variant: 'warning',
            })
            return false
        }

        if (!rowData.email) {
            enqueueSnackbar("Email is a required", {
                variant: 'warning',
            })
            return false
        }
        if (!rowData.role) {
            enqueueSnackbar("Role is a required", {
                variant: 'warning',
            })
            return false
        }
        return true
    };

    // save the edited data on the basics of validation
    const handleSaveRowData = (event) => {
        event.preventDefault();
        
        const toSaveRowData = {
            id: editRowData.id,
            name: editRowData.name,
            email: editRowData.email,
            role: editRowData.role
        }

        if (!validateInput(toSaveRowData)) return //validate before saving
        const newData = [...rows]
        const index = rows.findIndex((row) => row.id === editRowId)
        newData[index] = toSaveRowData
        setRows(newData)
        setSearchList(newData)
        setEditRowId(null)
    };


    // handle cancelation for row data
    const handleCancelRowData = () => {
        setEditRowId(null)
    };

    return (
        <>
            <Header performSearch={performSearch} />
            <DataTable
                rows={rows}
                searchList={searchList}
                selected={selected}
                editRowId={editRowId}
                editRowData={editRowData}
                page={page}
                rowsPerPage={rowsPerPage}
                handlePageChange={handlePageChange}
                onSelectAllClick={handleSelectAllClick}
                numSelected={selected.length}
                rowCount={rows.length}
                isSelected={isSelected}
                handleClick={handleClick}
                onEdit={onEdit}
                handleEditRowChange={handleEditrowChange}
                handleSaveRowData={handleSaveRowData}
                handleCancelEditRowData={handleCancelRowData}
                deleteAllSelectedRows={deleteAllSelectedRows}
                deleteSelectedRow={deleteSelectedRow}
            />
        </>
    )
}
export default Geektrust;