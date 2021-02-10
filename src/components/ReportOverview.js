import React, { Component } from "react";

import Aux from "../hoc/Aux";
import classesRE from "./ReportOverview.css";
import LamaLogo from "../images/lama.jpg";

// Material-UI ExpansionPanel components
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";

// Material UI Card components
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

// Material UI Table Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { DataGrid } from "@material-ui/data-grid";

// Material UI Dropdown components
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

// Material UI Progress Circle
import CircularProgress from '@material-ui/core/CircularProgress';

// Plotly.js
import Plot from "react-plotly.js";

const style = {
  buttonBar: {
    overflowX: "auto",
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  button: {
    minWidth: "150px",
  },
  formControl: {
    margin: 0,
    display: "flex",
    wrap: "nowrap",
  },
};

const muiClasses = (theme) => ({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      borderLeft: "1px solid rgba(224, 224, 224, 1)",
    },
  },
  input: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #4A690C",
    "&:focus": {
      borderRadius: 4,
      borderColor: "#4A690C",
    },
  },
});

class ReportOverview extends Component {
  state = {
    tabValue: 0,
    buttonOption: _sampleList[0],
    dropdownOption: "Global",
    overviewData: _assemblerPerformanceData,
    referenceData: _referenceData,
    mainDataTables: _mainDataTables,
    mainPlotData: _mainDataPlots,
  };

  plotChangeHandler = (event, value) => {
    console.log(event.target.innerHTML);
    this.setState({ buttonOption: event.target.innerHTML });
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ dropdownOption: event.target.value });
  };

  render() {

    const { classes } = this.props;

    const referenceFile = Object.keys(this.state.referenceData)[0]
    const referenceNames = Object.keys(this.state.referenceData[referenceFile])

    const overviewColumns = [
      {
        field: "assembler",
        headerName: "Assembler",
      },
      {
        field: "avgTime",
        headerName: "Avg Time",
      },
      {
        field: "cpus",
        headerName: "CPU/Hour",
        type: "number",
      },
      {
        field: "max_rss",
        headerName: "Max Memory (GB)",
        type: "number",
      },
      {
        field: "avgRead",
        headerName: "Average Read (GB)",
        type: "number",
      },
      {
        field: "avgWrite",
        headerName: "Average Write (GB)",
        type: "number",
      },
    ];

    const testDataGrid = (
      <div style={{ height: 476, width: "100%" }}>
        <DataGrid
          rows={this.state.overviewData}
          columns={overviewColumns}
          rowHeight={38}
          disableSelectionOnClick={true}
          hideFooter={true}
        />
      </div>
    );

    const globalTable = (
      <TableContainer component={Paper}>
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h5" align='center' style={{ color: "#4A690C" }}>
            <b>{this.state.buttonOption}</b>
          </Typography>
        </div>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2}>
                <b>Assembler</b>
              </TableCell>
              <TableCell colSpan={5} align="center">
                <b>Original Assembly</b>
              </TableCell>
              <TableCell
                colSpan={4}
                align="center"
                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
              >
                <b>Contigs > {_minContigSize}</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <b>Contigs</b>
              </TableCell>
              <TableCell align="center">
                <b>Basepairs</b>
              </TableCell>
              <TableCell align="center">
                <b>Max contig size</b>
              </TableCell>
              <TableCell align="center">
                <b>N50</b>
              </TableCell>
              <TableCell align="center">
                <b>Mapped reads</b>
              </TableCell>
              <TableCell align="center">
                <b>Contigs</b>
              </TableCell>
              <TableCell align="center">
                <b>Basepairs</b>
              </TableCell>
              <TableCell align="center">
                <b>N50</b>
              </TableCell>
              {/* <TableCell align="center">
                <b>Misassembled contigs</b>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.mainDataTables[this.state.buttonOption].GlobalTable.map((row) => (
              <TableRow key={row.assembler}>
                <TableCell component="th" scope="row">
                  {row.assembler}
                </TableCell>
                <TableCell align="right">{row.original.contigs}</TableCell>
                <TableCell align="right">{row.original.basepairs}</TableCell>
                <TableCell align="right">{row.original.max_contig_size}</TableCell>
                <TableCell align="right">{row.original.N50}</TableCell>
                <TableCell align="right">{row.original.mapped_reads !== 0 ? row.original.mapped_reads.toFixed(4) : row.original.mapped_reads}</TableCell>
                <TableCell align="right">{row.filtered.contigs}</TableCell>
                <TableCell align="right">{row.filtered.basepairs}</TableCell>
                <TableCell align="right">{row.filtered.N50}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

    const accordion = (
      <div>
        <div style={{ marginTop: "20px" }}>
          <Accordion defaultExpanded>
            <AccordionDetails>
              <div style={{ width: "100%", height: "100%", flexGrow: 1 }}>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs>
                    <Card style={{ maxWidth: 345 }}>
                      <CardMedia
                        style={{ height: 500 }}
                        image={LamaLogo}
                        title="Lama"
                      />
                    </Card>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h4" style={{ color: "#4A690C" }}>
                      Report Overview
                    </Typography>
                    <div style={{ marginTop: "5%" }}>
                      <Typography variant="h5">
                        <b>References:</b> {referenceFile}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs>
                    {testDataGrid}
                  </Grid>
                </Grid>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    );

    const dropdown = (
      <div>
        <FormControl variant="outlined" style={style.formControl}>
          <Select
            id="demo-simple-select"
            value={this.state.dropdownOption}
            onChange={(e) => this.handleChange(e)}
            className={classes.input}
          >
            <MenuItem value={"Global"}>Global</MenuItem>
            {referenceNames.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );



    let testAccordionMain = <Aux>{dropdown}</Aux>;

    if (this.state.dropdownOption === "Global") {

      const gridPlot = (
        <div style={{ marginTop: "60px" }}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Plot
                data={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].contig_size.data}
                layout={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].contig_size.layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Plot
                data={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].gap_size.data}
                layout={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].gap_size.layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            </Grid>
          </Grid>
        </div>
      );

      const gridPlotWide = (
        <div style={{ marginTop: "20px" }}>
          <Plot
            data={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].misassembly.data}
            layout={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].misassembly.layout}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            line={{
              width: 1,
            }}
          />
        </div>
      );

      testAccordionMain = (
        <Aux>
          {dropdown}
          <div style={{ marginTop: "20px" }}>{globalTable}</div>
          <div>{gridPlot}</div>
          <div>{gridPlotWide}</div>
        </Aux>
      );
    }

    if (this.state.dropdownOption !== "Global") {

      console.log("TESTE CARALHO")
      console.log(this.state.dropdownOption)
      console.log(this.state.buttonOption)
      console.log(this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].completness.data)

      const refComponent = (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h5" align='center' style={{ color: "#4A690C" }}>
            <b>{this.state.buttonOption}</b>
          </Typography>
          <Typography variant="h6" style={{ color: "#4A690C" }}>
            {this.state.dropdownOption}
          </Typography>
          <Typography variant="subtitle1">
            <b>Size:</b> {(this.state.referenceData[referenceFile][this.state.dropdownOption].size / 1000000).toFixed(2)} Mega Basepairs
          </Typography>
          <Typography variant="subtitle1">
            <b>%GC:</b> {this.state.referenceData[referenceFile][this.state.dropdownOption].GC.toFixed(2)}
          </Typography>
          <div style={{ marginTop: "20px" }}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense ref table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Assembler</b>
                    </TableCell>
                    <TableCell>
                      <b>Contiguity</b>
                    </TableCell>
                    <TableCell>
                      <b>Multiplicity</b>
                    </TableCell>
                    <TableCell>
                      <b>Identity</b>
                    </TableCell>
                    <TableCell>
                      <b>Lowest Identity</b>
                    </TableCell>
                    <TableCell>
                      <b>Breadth of Coverage</b>
                    </TableCell>
                    <TableCell>
                      <b>L90</b>
                    </TableCell>
                    <TableCell>
                      <b>Aligned Contigs</b>
                    </TableCell>
                    <TableCell>
                      <b>NA50</b>
                    </TableCell>
                    <TableCell>
                      <b>NG50</b>
                    </TableCell>
                    <TableCell>
                      <b>Aligned Basepairs</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.mainDataTables[this.state.buttonOption].ReferenceTables[this.state.dropdownOption][0].map((row) => (
                    <TableRow key={row.assembler}>
                      <TableCell component="th" scope="row">
                        {row.assembler}
                      </TableCell>
                      <TableCell align="right">{row.contiguity !== 0 ? row.contiguity.toFixed(4) : row.contiguity}</TableCell>
                      <TableCell align="right">{row.multiplicity !== 0 ? row.multiplicity.toFixed(4) : row.multiplicity}</TableCell>
                      <TableCell align="right">{row.identity !== 0 ? row.identity.toFixed(4) : row.identity}</TableCell>
                      <TableCell align="right">{row.lowest_identity !== 0 ? row.lowest_identity.toFixed(4) : row.lowest_identity}</TableCell>
                      <TableCell align="right">{row.breadth_of_coverage !== 0 ? row.breadth_of_coverage.toFixed(4) : row.breadth_of_coverage}</TableCell>
                      <TableCell align="right">{row.L90}</TableCell>
                      <TableCell align="right">{row.aligned_contigs}</TableCell>
                      <TableCell align="right">{row.NA50}</TableCell>
                      <TableCell align="right">{row.NG50}</TableCell>
                      <TableCell align="right">{row.aligned_basepairs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      );

      const refGridPlot = (
        <div style={{ marginTop: "60px" }}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Plot
                data={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].completness.data}
                layout={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].completness.layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Plot
                data={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].lx.data}
                layout={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].lx.layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            </Grid>
          </Grid>
        </div>
      );

      const refGridPlot2 = (
        <div style={{ marginTop: "20px" }}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Plot
                data={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].nax.data}
                layout={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].nax.layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Plot
                data={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].ngx.data}
                layout={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].ngx.layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            </Grid>
          </Grid>
        </div>
      );

      const gridPlotWideRef_1 = (
        <div style={{ marginTop: "20px" }}>
          <Plot
            data={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].phred.data}
            layout={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].phred.layout}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            line={{
              width: 1,
            }}
          />
        </div>
      );

      const gridPlotWideRef_2 = (
        <div style={{ marginTop: "20px" }}>
          <Plot
            data={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].gaps.data}
            layout={this.state.mainPlotData[this.state.buttonOption].PlotData[this.state.dropdownOption].gaps.layout}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            line={{
              width: 1,
            }}
          />
        </div>
      );

      testAccordionMain = (
        <Aux>
          {dropdown}
          <div>{refComponent}</div>
          <div>{refGridPlot}</div>
          <div>{refGridPlot2}</div>
          <div>{gridPlotWideRef_1}</div>
          <div>{gridPlotWideRef_2}</div>
        </Aux>
      );
    }

    const accordionMain = (
      <div>
        <div style={{ marginTop: "20px" }}>
          <Accordion defaultExpanded>
            <AccordionDetails>
              <div
                className={classesRE.mainPaper}
                style={{ width: "100%", height: "100%" }}
              >
                <div style={style.buttonBar}>
                  {_sampleList.map((id) => (
                    <Button
                      key={id}
                      style={style.button}
                      className={classesRE.tabButton}
                      onClick={(e) => {
                        this.plotChangeHandler(e);
                      }}
                    >
                      {id}
                    </Button>
                  ))}
                </div>
                {this.state.tabValue === 0 && testAccordionMain}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    );

    return (
      <Aux>
        <div>{accordion}</div>
        <div>{accordionMain}</div>
      </Aux>
    );
  }
}

export default withStyles(muiClasses, { withTheme: true })(ReportOverview);
