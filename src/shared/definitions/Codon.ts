/// <reference types="@rbxts/types" />

/**
 * @file        CodonData.ts
 * @module      CodonDefinitions
 * @layer       Shared/Data
 * @description Contains constants and types related to codons used in the game.
 * @author      Trembus
 * @license     MIT
 * @since       0.2.0
 * @lastUpdated 2025-06-25 by Trembus – Initial creation
 * @dependencies
 *   @rbxts/types ^0.4.0
 */

/* Codon Key Constants */
export const CODONKEY = [
	/* AAX */
	"AAA",
	"AAC",
	"AAG",
	"AAT",
	/*ACX*/
	"ACA",
	"ACC",
	"ACG",
	"ACT",
	/* AGX */
	"AGA",
	"AGC",
	"AGG",
	"AGT",
	/* ATX */
	"ATA",
	"ATC",
	"ATG",
	"ATT",
	/* CAX */
	"CAA",
	"CAC",
	"CAG",
	"CAT",
	/* CCX */
	"CCA",
	"CCC",
	"CCG",
	"CCT",
	/* CGX */
	"CGA",
	"CGC",
	"CGG",
	"CGT",
	/* CTX */
	"CTA",
	"CTC",
	"CTG",
	"CTT",
	/* GAX */
	"GAA",
	"GAC",
	"GAG",
	"GAT",
	/* GCX */
	"GCA",
	"GCC",
	"GCG",
	"GCT",
	/* GGX */
	"GGA",
	"GGC",
	"GGG",
	"GGT",
	/* GTX */
	"GTA",
	"GTC",
	"GTG",
	"GTT",
	/* TAA */
	"TAA",
	"TAC",
	"TAG",
	"TAT",
	/* TCX */
	"TCA",
	"TCC",
	"TCG",
	"TCT",
	/* TGX */
	"TGA",
	"TGC",
	"TGG",
	"TGT",
	/* TTX */
	"TTA",
	"TTC",
	"TTG",
	"TTT",
] as const;

export type CodonKey = (typeof CODONKEY)[number];

export const CODONKEYSET = new Set<CodonKey>(CODONKEY);
