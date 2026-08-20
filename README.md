# Group-Specific Amino Acid Finder

A browser-based, rule-driven tool for identifying group-exclusive or group-associated amino acid residues in an aligned protein FASTA.

**Live application:** https://group-specific-amino-acid-finder.umm99.chatgpt.site

Developed by **Umaimah Mohammed Hassen** as part of an MSc project in Molecular Biology at the University of Gothenburg (2026).

## What the tool does

The application compares one user-defined tested group, such as the *Helicobacter pylori* Hardy ecospecies, against every other sequence in the uploaded alignment. It counts residues directly at each alignment position; it does not use artificial intelligence to interpret or alter results.

Users can:

- upload an aligned protein FASTA;
- paste the identifiers belonging to the tested group;
- require 100%, 95%, or 85% prevalence in the tested group;
- allow zero, one, or two matching comparison sequences;
- select separate tested-group and comparison strains for residue numbering;
- review unmatched identifiers without stopping the analysis; and
- export results as CSV.

All analysis runs locally in the browser. Uploaded sequences are not sent to an AI model.

## Scientific definitions

- **Group-exclusive:** the residue meets the chosen tested-group prevalence threshold and occurs in zero comparison sequences.
- **Group-associated:** the residue meets the chosen tested-group prevalence threshold and occurs in no more than one or two comparison sequences, depending on the selected limit.
- **Prevalence:** the number of tested sequences containing the most frequent valid residue at an alignment position divided by the total number of tested sequences.
- **Valid defining residue:** gaps (`-`) and unknown residues (`X`) cannot define the tested group.

With ten tested sequences, 95% still requires 10/10 sequences, while 85% requires at least 9/10.

## Required input

The FASTA must contain **protein sequences that have already been aligned** and therefore have equal alignment length. The tool does not perform multiple-sequence alignment.

Tested-group identifiers are entered one per line. Partial identifiers are accepted; for example, `CAN-006` matches a complete FASTA header containing that text. Users should therefore choose identifiers that do not unintentionally match multiple strains.

## Interpreting results

Each result reports alignment position; coordinates and residues in the selected tested-group and comparison numbering strains; the tested-group residue and prevalence; residues in the comparison group; and the exact number of comparison sequences sharing the tested-group residue.

Results depend on alignment quality, strain identification, group definition, sampling, and selected thresholds. They should be checked before biological interpretation. “Associated” should not be described as “exclusive.”

## Validation

Controlled validation cases and expected behavior are documented in [VALIDATION.md](VALIDATION.md).

## Run locally

Requirements: Node.js 22.13 or later and npm.

```bash
npm install
npm run dev
```

The application source is primarily in `app/page.tsx`, with styles in `app/globals.css` and `app/update.css`.

## Citation

> Hassen, U. M. (2026). *Group-Specific Amino Acid Finder* (Version 0.1.0) [Computer software]. https://github.com/umaimahmohammed-cpu/group-specific-amino-acid-finder

Machine-readable citation metadata are provided in [CITATION.cff](CITATION.cff).

## License

This project is released under the [MIT License](LICENSE).

