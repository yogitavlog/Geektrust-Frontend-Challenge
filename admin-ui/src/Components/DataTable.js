import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Pagination from '@mui/material/Pagination';

const DataTable = ({
    rows,
    searchList,
    selected,
    editRowId,
    editRowData,
    page,
    rowsPerPage,
    handlePageChange,
    onSelectAllClick,
    numSelected,
    rowCount,
    isSelected,
    handleClick,
    onEdit,
    handleEditRowChange,
    handleSaveRowData,
    handleCancelEditRowData,
    deleteAllSelectedRows,
    deleteSelectedRow,
}) => {


    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <TableContainer component={Paper} sx={{ width: "80vw" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={numSelected > 0 && numSelected < rowCount}
                                        checked={rowCount > 0 && numSelected === rowCount}
                                        onChange={onSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all rows',
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "800" }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: "800" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: "800" }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: "800" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchList
                                .slice((page-1)*rowsPerPage , page * rowsPerPage)
                                .map((row) => {
                                    const isItemSelected = isSelected(row.id);

                                    return (
                                        <>
                                            {editRowId === row.id
                                                ? (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                color="primary"
                                                                checked={isItemSelected}

                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField size="small" required={true} id="outlined-basic" label="Name" variant="outlined" name="name" value={editRowData.name} onChange={handleEditRowChange} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField size="small" required={true} id="outlined-basic" label="Email" variant="outlined" name="email" value={editRowData.email} onChange={handleEditRowChange} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField size="small" required={true} id="outlined-basic" label="Role" variant="outlined" name="role" value={editRowData.role} onChange={handleEditRowChange} />
                                                        </TableCell>
                                                        <TableCell >
                                                            <SaveIcon style={{ marginRight: 10, cursor: 'pointer' }} onClick={handleSaveRowData} />
                                                            <CancelPresentationIcon style={{cursor: 'pointer' }} onClick={handleCancelEditRowData} />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                                : (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                color="primary"
                                                                checked={isItemSelected}

                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell>{row.role}</TableCell>
                                                        <TableCell>
                                                            <EditIcon sx={{marginRight: 2, cursor:"pointer"}} onClick={(event) => onEdit(event, row)}/>
                                                            <DeleteIcon sx={{cursor:"pointer", color:"error"}} onClick={(event) => deleteSelectedRow(event, row.id)}/>   
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        width: "80vw",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#FFFFFF",
                        my: "1rem",
                        paddingX: "2rem",
                        paddingY: "1rem",
                    }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ textTransform: "capitalize" }}
                        onClick={() => deleteAllSelectedRows(selected, rows)}
                    >
                        Delete Selected
                    </Button>
                    <Pagination
                        component="div"
                        count={Math.ceil(searchList.length/rowsPerPage)}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        size="medium"
                        defaultPage={1}
                    />
                </Box>
            </Box>
        </>
    )
}
export default DataTable;