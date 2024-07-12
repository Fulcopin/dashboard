import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Config {
    rows: Array<{ rangeHours: string, windDirection: string }>;
}

const BasicTable: React.FC<Config> = ({ rows }) => {
    const [tableRows, setTableRows] = useState(rows);

    useEffect(() => {
        setTableRows(rows);
    }, [rows]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Rango de horas</TableCell>
                        <TableCell align="right">Dirección del viento</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.rangeHours}
                            </TableCell>
                            <TableCell align="right">{row.windDirection}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;
