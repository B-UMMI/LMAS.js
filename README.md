# LMAS Report


                      _    __  __   _   ___
       /\︵︵/\      | |  |  \/  | /_\ / __|
      (◕('人')◕)     | |__| |\/| |/ _ \\__ \
         |︶|        |____|_|  |_/_/ \_\___/

         Last Metagenomic Assembler Standing


## Overview

[LMAS](https://github.com/cimendes/LMAS) is an automated workflow enabling the benchmarking of traditional and metagenomic prokaryotic _de novo_ assembly software using defined mock communities. The results are presented in an **interactive HTML report** where selected global and reference specific performance metrics can be explored.

This repo contains the source code for the interactive report that comes pre-packaged with [LMAS](https://github.com/cimendes/LMAS).

## Installation & Use

This project uses `npx webpack` to compile a standalone `main.js` file to be integrated into [LMAS](https://github.com/cimendes/LMAS).

### Re-create conda env

The necessary dependencies for the project are provided in the [environment.yml](environment.yml) file available in this repo.

To recreate it, simply run:

    conda env create -f environment.yml

Additionally, the js dependencies need to be installed. Run in the root of the repo:

    npm install

### Compile main.js

Run in the root of the repo:

    npx webpack 

This creates the `main.js` in the `dist/` directory where the command was run. It expects the `index.html` file in the same location, created by the LMAS workflow.

## Citation and Contacts

LMAS is developed at the Molecular [Microbiology and Infection Unit (UMMI)](http://darwin.phyloviz.net/wiki/doku.php) at the [Instituto de Medicina Molecular Joao Antunes](https://imm.medicina.ulisboa.pt/en/), in collaboration with [Microbiology, Advanced Genomics and Infection Control Applications Laboratory (MAGICAL)](https://morangiladlab.com) at the [Faculty of Health Sciences, Ben-Gurion University of the Negev](https://in.bgu.ac.il/en/fohs/Pages/default.aspx). 

This project is licensed under the [GPLv3 license](https://github.com/cimendes/LMAS/blob/main/LICENSE).

If you use LMAS please cite [LMAS](https://github.com/cimendes/LMAS) repository.
