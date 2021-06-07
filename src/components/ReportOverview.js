import React, { Component } from "react";

import Aux from "../hoc/Aux";
import classesRE from "./ReportOverview.css";
import LamaLogo from "../images/lmas_logo_wide.jpg";

// Material-UI ExpansionPanel components
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from '@material-ui/core/AccordionSummary';

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
import Link from "@material-ui/core/Link";

// Material UI Icons
import ErrorIcon from "@material-ui/icons/Error";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from "@material-ui/core/colors";

// Plotly.js
import Plot from "react-plotly.js";

// React-Markdown
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const linkRenderer = (props) => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
};

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
    overviewButtonOption: 0,
    dropdownOption: "Global",
    overviewData: _assemblerPerformanceData,
    referenceData: _referenceData,
    mainDataTables: _mainDataTables,
    mainPlotData: _mainDataPlots,
    sampleData: _sampleData,
    overviewMD: _overviewMD
  };

  plotChangeHandler = (id) => {
    console.log(id);
    this.setState({ buttonOption: id });
  };

  tabChangeHandler = (value) => {
    console.log(value);
    this.setState({ overviewButtonOption: value });
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ dropdownOption: event.target.value });
  };

  render() {
    const { classes } = this.props;

    const referenceFile = Object.keys(this.state.referenceData)[0];
    const referenceNames = Object.keys(this.state.referenceData[referenceFile]);

    function objToString(obj) {
      var str = "";
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str += `${p}: ${obj[p].reads} read pairs; `;
        }
      }
      return str;
    }

    const sampleDataString = objToString(this.state.sampleData);

    const overviewColumns = [
      {
        field: "assembler",
        width: 200,
        renderHeader: () => <strong>{"Assembler"}</strong>,
      },
      {
        field: "version",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderHeader: () => <strong>{"Version"}</strong>,
      },
      {
        field: "container",
        width: 350,
        headerAlign: "center",
        align: "center",
        renderHeader: () => <strong>{"Container"}</strong>,
      },
      {
        field: "avgTime",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderHeader: () => <strong>{"Avg Time"}</strong>,
      },
      {
        field: "cpus",
        width: 200,
        headerName: "CPU/Hour",
        type: "number",
        headerAlign: "center",
        renderHeader: () => <strong>{"CPU/Hour"}</strong>,
      },
      {
        field: "max_rss",
        width: 200,
        type: "number",
        headerAlign: "center",
        renderHeader: () => <strong>{"Max Memory (GB)"}</strong>,
      },
      {
        field: "avgRead",
        width: 200,
        type: "number",
        headerAlign: "center",
        renderHeader: () => <strong>{"Average Read (GB)"}</strong>,
      },
      {
        field: "avgWrite",
        width: 200,
        type: "number",
        headerAlign: "center",
        renderHeader: () => <strong>{"Average Write (GB)"}</strong>,
      },
    ];

    const testDataGrid = (
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={this.state.overviewData}
          columns={overviewColumns}
          disableSelectionOnClick={true}
          hideFooter={true}
        />
      </div>
    );

    const globalTable = (
      <TableContainer component={Paper}>
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h5" align="center" style={{ color: "#4A690C" }}>
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
              <TableCell rowSpan={3}>
                <b>Assembler</b>
              </TableCell>
              <TableCell colSpan={6} align="center">
                <b>Original Assembly</b>
              </TableCell>
              <TableCell
                colSpan={5}
                align="center"
                style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
              >
                <b>Contigs > {_minContigSize} bps</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                title="Total number of contigs in the assembly"
                align="center">
                <b>Contigs</b>
              </TableCell>
              <TableCell
                title="Total number of basepairs in the assembly"
                align="center">
                <b>Basepairs</b>
              </TableCell>
              <TableCell
                title="Lenght on the largest contig in the assembly"
                align="center">
                <b>Largest contig (bps)</b>
              </TableCell>
              <TableCell
                title="Length for which the collection of all contigs of that length or longer covers at least 50% of the total length of the assembled contigs"
                align="center">
                <b>N50</b>
              </TableCell>
              <TableCell
                title="Percentage of mapped reads to the assembly"
                align="center">
                <b>Mapped reads (%)</b>
              </TableCell>
              <TableCell title="Total of 'N's in assembly basepairs">
                <b>#Ns</b>
              </TableCell>
              <TableCell
                title="Total number of contigs in the assembly"
                align="center">
                <b>Contigs</b>
              </TableCell>
              <TableCell
                title="Total number of basepairs in the assembly"
                align="center">
                <b>Basepairs</b>
              </TableCell>
              <TableCell
                title="Length for which the collection of all contigs of that length or longer covers at least 50% of the total length of the assembled contigs"
                align="center">
                <b>N50</b>
              </TableCell>
              <TableCell
                title="Number of missassembled contigs in the assembly"
                align="center">
                <b>Misassembled contigs</b>
              </TableCell>
              <TableCell title="Total of 'N's in assembly basepairs">
                <b>#Ns</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.mainDataTables[this.state.buttonOption].GlobalTable.map(
              (row) => (
                <TableRow key={row.assembler}>
                  <TableCell component="th" scope="row">
                    {row.assembler}
                    {row.original.contigs !== 0 ? (
                      ""
                    ) : (
                        <ErrorIcon style={{ color: red[500] }} />
                      )}
                  </TableCell>
                  <TableCell align="right">{row.original.contigs}</TableCell>
                  <TableCell align="right">{row.original.basepairs}</TableCell>
                  <TableCell align="right">
                    {row.original.max_contig_size}
                  </TableCell>
                  <TableCell align="right">{row.original.N50}</TableCell>
                  <TableCell align="right">
                    {row.original.mapped_reads !== 0
                      ? row.original.mapped_reads.toFixed(4)
                      : row.original.mapped_reads}
                  </TableCell>
                  <TableCell align="right">{row.original.Ns}</TableCell>
                  <TableCell align="right">{row.filtered.contigs}</TableCell>
                  <TableCell align="right">{row.filtered.basepairs}</TableCell>
                  <TableCell align="right">{row.filtered.N50}</TableCell>
                  <TableCell align="right">{row.filtered.misassembled_contigs}</TableCell>
                  <TableCell align="right">{row.filtered.Ns}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );

    const overviewInfo = (
      <Aux>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="left"
          alignItems="left"
        >
          <Grid item xs={7}>
            <Typography variant="h4" style={{ color: "#4A690C" }}>
              Input Data
            </Typography>
            <div style={{ marginTop: "2%" }}>
              <Typography variant="h5">
                <b>References:</b> {referenceFile}
              </Typography>
              <Typography variant="h5">
                <b>Samples:</b> {sampleDataString}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={5} alignItems="right" justify="right">
            <Card style={{ maxWidth: 650, borderRadius: 0, boxShadow: "none" }}>
              <CardMedia
                component="img"
                alt="Contemplative Lama"
                //style={{ height: 200 }}
                image={LamaLogo}
                title="Lama"
              />
            </Card>
          </Grid>
          <Grid item xs={0}>
            <div>
              <Typography variant="h4" style={{ color: "#4A690C" }}>
                About
              </Typography>
              <ReactMarkdown
                renderers={{ link: linkRenderer }}
                plugins={[gfm]}
                children={this.state.overviewMD}
              />
            </div>
          </Grid>
        </Grid>
      </Aux>
    );

    const aboutUs = (
      <div style={{ marginTop: "2%", marginBottom: "2%" }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ maxWidth: 500, borderRadius: 0, boxShadow: "none" }}>
            <CardMedia
              component="img"
              alt="Contemplative Lama"
              //style={{ height: 200 }}
              image={LamaLogo}
              title="Lama"
            />
          </Card>
        </div>
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
          <Typography>
            LMAS is an automated workflow enabling the benchmarking of traditional and metagenomic prokaryotic <i>de novo</i> assembly software using defined mock communities.
          It's implemented in {" "}
            <Link href="https://www.nextflow.io/" target="_blank" rel="noopener noreferrer">
              Nextflow
          </Link>
          , providing flexibility and ensure the transparency and reproducibility of the results. LMAS relies on the use of containers, such as {" "}
            <Link href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">
              Docker
          </Link>
          , for each assembler, allowing versions to be tracked and updated easily.  It can be deployed effortlessly in any UNIX-based system, from local machines to high-performance computing clusters.
        </Typography>
          <br />
          <Typography>
            The LMAS workflow sourcecode is available on GitHub under {" "}
            <Link href="https://github.com/cimendes/LMAS" target="_blank" rel="noopener noreferrer">
              https://github.com/cimendes/LMAS
          </Link>
          and the report source code is available at {" "}
            <Link href="https://github.com/cimendes/lmas_report" target="_blank" rel="noopener noreferrer">
              https://github.com/cimendes/lmas_report
          </Link>
          . The documentation is available on ReadTheDocs at {" "}
            <Link href="https://lmas.readthedocs.io" target="_blank" rel="noopener noreferrer">
              https://lmas.readthedocs.io
          </Link>
          </Typography>
          <br />
          <Typography>
            LMAS is developed at the {" "}
            <Link href="http://darwin.phyloviz.net/wiki/doku.php" target="_blank" rel="noopener noreferrer">
              Molecular Microbiology and Infection Unit (UMMI)
          </Link>
            {" "}at the {" "}
            <Link href="https://imm.medicina.ulisboa.pt/en/" target="_blank" rel="noopener noreferrer">
              Instituto de Medicina Molecular Joao Antunes
          </Link>
          , in collaboration with{" "}
            <Link href="https://morangiladlab.com/" target="_blank" rel="noopener noreferrer">
              Microbiology, Advanced Genomics and Infection Control Applications Laboratory (MAGICAL)
          </Link>
            {" "}at the{" "}
            <Link href="https://in.bgu.ac.il/en/fohs/Pages/default.aspx" target="_blank" rel="noopener noreferrer">
              Faculty of Health Sciences, Ben-Gurion University of the Negev
          </Link>
          .{" "}
          </Typography>
          <br />
          <Typography>
            This project is licensed under the {" "}
            <Link href="https://github.com/cimendes/LMAS/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
              GPLv3 license
          </Link>
          .
        </Typography>
        </div>
      </div >
    );

    const accordion = (
      <div>
        <div style={{ marginTop: "20px" }}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="overview-panel-content"
              id="overview-panel"
            >
              <Typography
                variant="h5"
                style={{ color: "#4A690C" }}>
                Summary Panel
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: "100%", height: "100%", flexGrow: 1 }}>
                <div style={style.buttonBar}>
                  <Button
                    style={style.button}
                    className={`${this.state.overviewButtonOption === 0 && classesRE.tabButton}`}
                    onClick={() => {
                      this.tabChangeHandler(0);
                    }}
                  >
                    Overview
                  </Button>
                  <Button
                    style={style.button}
                    className={`${this.state.overviewButtonOption === 1 && classesRE.tabButton}`}
                    onClick={() => {
                      this.tabChangeHandler(1);
                    }}
                  >
                    Performance
                  </Button>
                  <Button
                    style={style.button}
                    className={`${this.state.overviewButtonOption === 2 && classesRE.tabButton}`}
                    onClick={() => {
                      this.tabChangeHandler(2);
                    }}
                  >
                    About Us
                  </Button>
                </div>
                {this.state.overviewButtonOption === 0 && overviewInfo}
                {this.state.overviewButtonOption === 1 && testDataGrid}
                {this.state.overviewButtonOption === 2 && aboutUs}
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
                {id.replace(/_/g, ' ')}
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
              <Typography
                variant="h5"
                align="center"
                style={{ color: "#4A690C" }}
              >
                Contig size distribution per assembler (contigs over{" "}
                {_minContigSize})
              </Typography>
              <Plot
                data={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].contig_size.data
                }
                layout={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].contig_size.layout
                }
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
              <Typography align="center">
                Gray boxplots represent the size distribution of contigs that
                align to any of the reference genomes per assembler. Unmapped
                contigs are represented as red circles. Only contigs larger than{" "}
                {_minContigSize} basepairs are considered.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                align="center"
                style={{ color: "#4A690C" }}
              >
                Gap size distribution per assembler (contigs over{" "}
                {_minContigSize})
              </Typography>
              <Plot
                data={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].gap_size.data
                }
                layout={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].gap_size.layout
                }
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
              <Typography align="center">
                Gray boxplots represent the distribution of gap sizes in
                comparison to the reference genomes per assembler. Only contigs
                larger than {_minContigSize} basepairs are considered.
              </Typography>
            </Grid>
          </Grid>
        </div>
      );

      const gridPlotWide = (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h5" align="center" style={{ color: "#4A690C" }}>
            Misassembled contigs
          </Typography>
          <Plot
            data={
              this.state.mainPlotData[this.state.buttonOption].PlotData[
                this.state.dropdownOption
              ].misassembly.data
            }
            layout={
              this.state.mainPlotData[this.state.buttonOption].PlotData[
                this.state.dropdownOption
              ].misassembly.layout
            }
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            line={{
              width: 1,
            }}
          />
          <Typography align="center">
            Scatter plot for misassembled contigs per assembler. The y-axis
            represent the number of blocks the misassembled contig was broken
            into in the mapping process, and the x axis its size in basepairs.
            Information of the type of misassembly is available as hoover text
            for the type of misassembly. The box plot represents the
            distribution on contig size for all misassembled contigs.
          </Typography>
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
      const refComponent = (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h5" align="center" style={{ color: "#4A690C" }}>
            <b>{this.state.buttonOption}</b>
          </Typography>
          <Typography variant="h5" style={{ color: "#4A690C" }}>
            <i>{this.state.dropdownOption.replace(/_/g, ' ')}</i>
          </Typography>
          <Typography variant="subtitle1">
            <b>Size:</b>{" "}
            {
              this.state.referenceData[referenceFile][this.state.dropdownOption]
                .size
            }{" "}
            Basepairs
          </Typography>
          <Typography variant="subtitle1">
            <b>%GC:</b>{" "}
            {this.state.referenceData[referenceFile][
              this.state.dropdownOption
            ].GC.toFixed(2)}
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
                    <TableCell title="Longest single alignment between the assembly and the reference, relative to the reference length">
                      <b>Contiguity</b>
                    </TableCell>
                    <TableCell title="Ratio of the length of alignable assembled sequence to covered sequence on the reference">
                      <b>Multiplicity</b>
                    </TableCell>
                    <TableCell title="Ratio of the length of alignable assembled sequence to total basepairs in the aligned contings">
                      <b>Validity</b>
                    </TableCell>
                    <TableCell title="Cost of the assembly (multiplicity over validity)">
                      <b>Parsimony</b>
                    </TableCell>
                    <TableCell title="Ratio of identical basepairs in all aligned contigs to the reference">
                      <b>Identity</b>
                    </TableCell>
                    <TableCell title="Identity of the lowest scoring contig to the reference">
                      <b>Lowest Identity</b>
                    </TableCell>
                    <TableCell title="Ratio of covered sequence on the reference by aligned contigs">
                      <b>Breadth of Coverage</b>
                    </TableCell>
                    <TableCell title="Number of aligned contigs to the reference">
                      <b>Aligned Contigs</b>
                    </TableCell>
                    <TableCell title="Number of aligned contigs with misassemblies">
                      <b>Misassembled contigs</b>
                    </TableCell>
                    <TableCell title="Minimal number of contigs that cover 90% of the sequence of the reference">
                      <b>L90</b>
                    </TableCell>
                    <TableCell title="Length for which the collection of all aligned contigs of that length or longer covers at least 50% of the total length of the aligned assembled contigs">
                      <b>NA50</b>
                    </TableCell>
                    <TableCell title="Length for which the collection of all aligned contigs of that length or longer covers at least 50% of the sequence of the reference">
                      <b>NG50</b>
                    </TableCell>
                    <TableCell title="Total basepairs aligned to to the reference">
                      <b>Aligned Basepairs</b>
                    </TableCell>
                    <TableCell title="Total of 'N's in basepairs aligned to to the reference">
                      <b>#Ns</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.mainDataTables[
                    this.state.buttonOption
                  ].ReferenceTables[this.state.dropdownOption][0].map((row) => (
                    <TableRow key={row.assembler}>
                      <TableCell component="th" scope="row">
                        {row.assembler}
                        {row.aligned_contigs !== 0 ? (
                          ""
                        ) : (
                            <ErrorIcon style={{ color: red[500] }} />
                          )}
                      </TableCell>
                      <TableCell align="right">
                        {row.contiguity !== 0
                          ? row.contiguity.toFixed(4)
                          : row.contiguity}
                      </TableCell>
                      <TableCell align="right">
                        {row.multiplicity !== 0
                          ? row.multiplicity.toFixed(4)
                          : row.multiplicity}
                      </TableCell>
                      <TableCell align="right">
                        {row.validity !== 0
                          ? row.validity.toFixed(4)
                          : row.validity}
                      </TableCell>
                      <TableCell align="right">
                        {row.parsimony !== 0
                          ? row.parsimony.toFixed(4)
                          : row.parsimony}
                      </TableCell>
                      <TableCell align="right">
                        {row.identity !== 0
                          ? row.identity.toFixed(4)
                          : row.identity}
                      </TableCell>
                      <TableCell align="right">
                        {row.lowest_identity !== 0
                          ? row.lowest_identity.toFixed(4)
                          : row.lowest_identity}
                      </TableCell>
                      <TableCell align="right">
                        {row.breadth_of_coverage !== 0
                          ? row.breadth_of_coverage.toFixed(4)
                          : row.breadth_of_coverage}
                      </TableCell>
                      <TableCell align="right">{row.aligned_contigs}</TableCell>
                      <TableCell align="right">
                        {row.misassembled_contigs}
                      </TableCell>
                      <TableCell align="right">{row.L90}</TableCell>
                      <TableCell align="right">{row.NA50}</TableCell>
                      <TableCell align="right">{row.NG50}</TableCell>
                      <TableCell align="right">{row.aligned_basepairs}</TableCell>
                      <TableCell align="right">{row.Ns}</TableCell>
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
              <Typography
                variant="h6"
                align="center"
                style={{ color: "#4A690C" }}
              >
                <i>{this.state.dropdownOption.replace(/_/g, ' ')}</i> Genome Fragmentation
              </Typography>
              {typeof this.state.mainPlotData[this.state.buttonOption].PlotData[
                this.state.dropdownOption
              ].completness === "undefined" ? (
                  <div />
                ) : (
                  <Plot
                    data={
                      this.state.mainPlotData[this.state.buttonOption].PlotData[
                        this.state.dropdownOption
                      ].completness.data
                    }
                    layout={
                      this.state.mainPlotData[this.state.buttonOption].PlotData[
                        this.state.dropdownOption
                      ].completness.layout
                    }
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                    line={{
                      width: 1,
                    }}
                  />
                )}
              <Typography align="center">
                Number of contigs per breath of coverage of the reference per
                assembler. Data for assemblers who fail to produce sequences
                that align to the reference aren't present.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                align="center"
                style={{ color: "#4A690C" }}
              >
                <i>{this.state.dropdownOption.replace(/_/g, ' ')}</i> Lx Metric
              </Typography>
              {typeof this.state.mainPlotData[this.state.buttonOption].PlotData[
                this.state.dropdownOption
              ].lx === "undefined" ? (
                  <div />
                ) : (
                  <Plot
                    data={
                      this.state.mainPlotData[this.state.buttonOption].PlotData[
                        this.state.dropdownOption
                      ].lx.data
                    }
                    layout={
                      this.state.mainPlotData[this.state.buttonOption].PlotData[
                        this.state.dropdownOption
                      ].lx.layout
                    }
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                    line={{
                      width: 1,
                    }}
                  />
                )}
              <Typography align="center">
                Minimal number of contigs that cover <i>x</i> percent of the sequence
                of the reference, ranging from 0 to 100, per assembler. Data for
                assemblers who fail to produce sequences that align to the
                reference aren't present.
              </Typography>
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
              <Typography
                variant="h6"
                align="center"
                style={{ color: "#4A690C" }}
              >
                <i>{this.state.dropdownOption.replace(/_/g, ' ')}</i> NAx Metric
              </Typography>
              {typeof this.state.mainPlotData[this.state.buttonOption].PlotData[
                this.state.dropdownOption
              ].nax === "undefined" ? (
                  <div />
                ) : (
                  <Plot
                    data={
                      this.state.mainPlotData[this.state.buttonOption].PlotData[
                        this.state.dropdownOption
                      ].nax.data
                    }
                    layout={
                      this.state.mainPlotData[this.state.buttonOption].PlotData[
                        this.state.dropdownOption
                      ].nax.layout
                    }
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                    line={{
                      width: 1,
                    }}
                  />
                )}
              <Typography align="center">
                Length for which the collection of all aligned contigs of that
                length or longer covers at least <i>x</i> percent of the total length
                of the aligned assembled contigs, ranging from 0 to 100, per
                assembler. Data for assemblers who fail to produce sequences
                that align to the reference aren't present.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                align="center"
                style={{ color: "#4A690C" }}
              >
                <i>{this.state.dropdownOption.replace(/_/g, ' ')}</i> NGx Metric
              </Typography>
              {typeof this.state.mainPlotData[this.state.buttonOption].PlotData[
                this.state.dropdownOption
              ].ngx === "undefined" ? (
                  <div />
                ) : (
                  <Plot
                    data={
                      this.state.mainPlotData[this.state.buttonOption].PlotData[
                        this.state.dropdownOption
                      ].ngx.data
                    }
                    layout={
                      this.state.mainPlotData[this.state.buttonOption].PlotData[
                        this.state.dropdownOption
                      ].ngx.layout
                    }
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                    line={{
                      width: 1,
                    }}
                  />
                )}
              <Typography align="center">
                Length for which the collection of all aligned contigs of that
                length or longer covers at least <i>x</i> percentage of the sequence of
                the reference, ranging from 0 to 100, per assembler. Data for
                assemblers who fail to produce sequences that align to the
                reference aren't present.
              </Typography>
            </Grid>
          </Grid>
        </div>
      );

      const gridPlotWideRef_1 = (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6" align="center" style={{ color: "#4A690C" }}>
            <i>{this.state.dropdownOption.replace(/_/g, ' ')}</i> PLS Metric
          </Typography>
          {typeof this.state.mainPlotData[this.state.buttonOption].PlotData[
            this.state.dropdownOption
          ].phred === "undefined" ? (
              <div />
            ) : (
              <Plot
                data={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].phred.data
                }
                layout={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].phred.layout
                }
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            )}
          <Typography align="center">
            Phred-like score per contig, per assembler. Data for assemblers
            who fail to produce sequences that align to the reference aren't
            present.
          </Typography>
        </div>
      );

      const gridPlotWideRef_2 = (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6" align="center" style={{ color: "#4A690C" }}>
            <i>{this.state.dropdownOption.replace(/_/g, ' ')}</i> Gaps
          </Typography>
          {typeof this.state.mainPlotData[this.state.buttonOption].PlotData[
            this.state.dropdownOption
          ].gaps === "undefined" ? (
              <div />
            ) : (
              <Plot
                data={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].gaps.data
                }
                layout={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].gaps.layout
                }
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            )}
          <Typography align="center">
            Location of gaps in comparison to the reference sequence, per
            assembler. Length of gap, in basepairs, is available as hoover text.
            The top plot represents the histogram of the cumulative number of
            gaps per position in the reference. Data for assemblers who fail to
            produce sequences that align to the reference aren't present.
          </Typography>
        </div>
      );

      const gridPlotWideRef_3 = (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6" align="center" style={{ color: "#4A690C" }}>
            <i>{this.state.dropdownOption.replace(/_/g, ' ')}</i> SNPs
          </Typography>
          {typeof this.state.mainPlotData[this.state.buttonOption].PlotData[
            this.state.dropdownOption
          ].snps === "undefined" ? (
              <div />
            ) : (
              <Plot
                data={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].snps.data
                }
                layout={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].snps.layout
                }
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            )}
          <Typography align="center">
            Location of substitutions in comparison to the reference sequence,
            per assembler. The top plot represents the histogram of the
            cumulative number of substitutions per position in the reference.
            Data for assemblers who fail to produce sequences that align to the
            reference aren't present.
          </Typography>
        </div>
      );

      const gridPlotWideRef_4 = (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6" align="center" style={{ color: "#4A690C" }}>
            <i>{this.state.dropdownOption.replace(/_/g, ' ')}</i> Misassemblies
          </Typography>
          {typeof this.state.mainPlotData[this.state.buttonOption].PlotData[
            this.state.dropdownOption
          ].misassembly === "undefined" ? (
              <div />
            ) : (
              <Plot
                data={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].misassembly.data
                }
                layout={
                  this.state.mainPlotData[this.state.buttonOption].PlotData[
                    this.state.dropdownOption
                  ].misassembly.layout
                }
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                line={{
                  width: 1,
                }}
              />
            )}
          <Typography align="center">
            Location of misassembled blocks in the filtered assembly in comparison to the reference sequence,
            per assembler. The top plot represents the histogram of the
            cumulative number of positions of the misassembled blocks in the reference.
            Data for assemblers who fail to produce sequences that align to the
            reference aren't present.
          </Typography>
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
          <div>{gridPlotWideRef_3}</div>
          <div>{gridPlotWideRef_4}</div>
        </Aux>
      );
    }

    const accordionMain = (
      <div>
        <div style={{ marginTop: "20px" }}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="references-panel-content"
              id="references-panel"
            >
              <Typography
                variant="h5"
                style={{ color: "#4A690C" }}>
                Metrics Panel
              </Typography>
            </AccordionSummary>

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
                      className={`${this.state.buttonOption === id && classesRE.tabButton}`}
                      onClick={() => {
                        this.plotChangeHandler(id);
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
