# Validation

## Purpose

These cases test the program's counting and filtering rules independently of biological interpretation. Input sequences must already be aligned and have equal alignment length.

## Controlled cases

| Case | Tested group | Comparison group | Setting | Expected result |
|---|---:|---:|---|---|
| Strict exclusive | 10/10 contain A | 0 contain A | 100%, maximum 0 comparison matches | Report A |
| One tested exception | 9/10 contain A | 0 contain A | 85%, maximum 0 | Report A |
| One tested exception at strict threshold | 9/10 contain A | 0 contain A | 95% or 100% | Do not report A |
| One comparison exception | 10/10 contain A | 1 contains A | Maximum 0 | Do not report A |
| One allowed comparison exception | 10/10 contain A | 1 contains A | Maximum 1 or 2 | Report A as associated, not exclusive |
| Too many comparison exceptions | 10/10 contain A | 2 contain A | Maximum 1 | Do not report A |
| Gap or unknown candidate | Tested consensus is `-` or `X` | Any | Any threshold | Do not use as defining residue |
| Missing tested identifiers | Some identifiers are absent | Valid matches remain | Any | Continue and report found/missing counts |
| No tested sequence found | 0 identifiers match | Comparison sequences present | Any | Stop with a clear error |
| No comparison group | Every sequence is tested | 0 comparison sequences | Any | Stop with a clear error |

## Numbering checks

Coordinates are calculated independently for the selected tested-group and comparison reference sequences. Alignment gaps do not increase residue numbers, so displayed coordinates may differ when either reference contains an insertion or deletion.

## CSV checks

The exported CSV includes both reference-coordinate systems, tested-group residue count and total, comparison match count and total, tested-group prevalence threshold, and maximum permitted comparison matches. Displayed and exported counts should agree at every reported position.

## Biological interpretation

Passing a computational rule does not demonstrate functional importance. Results can change when strains are added or when the alignment, annotation, or group assignment changes. Complete unreduced alignments preserve strain-level exceptions better than representative-only clustered datasets.

