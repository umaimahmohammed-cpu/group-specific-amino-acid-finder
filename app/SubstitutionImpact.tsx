type Props={from:string;to:string};

type AAProp={name:string;charge:string;polarity:string;size:string;hydropathy:number;mass:number};

const AA:Record<string,AAProp>={
 A:{name:"Alanine",charge:"neutral",polarity:"nonpolar",size:"small",hydropathy:1.8,mass:89.09},
 R:{name:"Arginine",charge:"positive",polarity:"polar",size:"large",hydropathy:-4.5,mass:174.20},
 N:{name:"Asparagine",charge:"neutral",polarity:"polar",size:"medium",hydropathy:-3.5,mass:132.12},
 D:{name:"Aspartate",charge:"negative",polarity:"polar",size:"small",hydropathy:-3.5,mass:133.10},
 C:{name:"Cysteine",charge:"neutral",polarity:"polar",size:"small",hydropathy:2.5,mass:121.16},
 Q:{name:"Glutamine",charge:"neutral",polarity:"polar",size:"medium",hydropathy:-3.5,mass:146.15},
 E:{name:"Glutamate",charge:"negative",polarity:"polar",size:"medium",hydropathy:-3.5,mass:147.13},
 G:{name:"Glycine",charge:"neutral",polarity:"nonpolar",size:"small",hydropathy:-0.4,mass:75.07},
 H:{name:"Histidine",charge:"positive/neutral",polarity:"polar",size:"medium",hydropathy:-3.2,mass:155.16},
 I:{name:"Isoleucine",charge:"neutral",polarity:"nonpolar",size:"medium",hydropathy:4.5,mass:131.17},
 L:{name:"Leucine",charge:"neutral",polarity:"nonpolar",size:"medium",hydropathy:3.8,mass:131.17},
 K:{name:"Lysine",charge:"positive",polarity:"polar",size:"large",hydropathy:-3.9,mass:146.19},
 M:{name:"Methionine",charge:"neutral",polarity:"nonpolar",size:"medium",hydropathy:1.9,mass:149.21},
 F:{name:"Phenylalanine",charge:"neutral",polarity:"nonpolar",size:"large",hydropathy:2.8,mass:165.19},
 P:{name:"Proline",charge:"neutral",polarity:"nonpolar",size:"small",hydropathy:-1.6,mass:115.13},
 S:{name:"Serine",charge:"neutral",polarity:"polar",size:"small",hydropathy:-0.8,mass:105.09},
 T:{name:"Threonine",charge:"neutral",polarity:"polar",size:"small",hydropathy:-0.7,mass:119.12},
 W:{name:"Tryptophan",charge:"neutral",polarity:"nonpolar",size:"large",hydropathy:-0.9,mass:204.23},
 Y:{name:"Tyrosine",charge:"neutral",polarity:"polar",size:"large",hydropathy:-1.3,mass:181.19},
 V:{name:"Valine",charge:"neutral",polarity:"nonpolar",size:"small",hydropathy:4.2,mass:117.15},
};

function impact(from:string,to:string){
 const a=AA[from],b=AA[to];
 if(!a||!b||from===to)return null;
 const changes:string[]=[];
 if(a.charge!==b.charge)changes.push("charge");
 if(a.polarity!==b.polarity)changes.push("polarity");
 if(a.size!==b.size)changes.push("size");
 const hydro=Math.abs(b.hydropathy-a.hydropathy);
 const mass=Math.abs(b.mass-a.mass);
 if(hydro>=2)changes.push("hydrophobicity");
 if(mass>=30)changes.push("mass");
 const score=(a.charge!==b.charge?2:0)+(a.polarity!==b.polarity?1:0)+(a.size!==b.size?1:0)+(hydro>=2?1:0)+(mass>=30?1:0);
 const level=score>=4?"Strong physicochemical change":score>=2?"Moderate physicochemical change":"Conservative change";
 return{a,b,changes,hydro,mass,level};
}

export default function SubstitutionImpact({from,to}:Props){
 if(from==="-"||to==="-")return <div><span>Substitution impact</span><b>Gap / indel — not a simple amino-acid substitution</b></div>;
 const x=impact(from,to);
 if(!x)return null;
 return <>
  <div><span>Substitution</span><b>{from} → {to}</b></div>
  <div><span>Physicochemical impact</span><b>{x.level}</b></div>
  <div><span>Size</span><b>{x.a.size} → {x.b.size}{x.a.size===x.b.size?" (same class)":""}</b></div>
  <div><span>Charge</span><b>{x.a.charge} → {x.b.charge}</b></div>
  <div><span>Polarity</span><b>{x.a.polarity} → {x.b.polarity}</b></div>
  <div><span>Hydropathy Δ</span><b>{x.hydro.toFixed(1)}</b></div>
  <div><span>Approx. mass Δ</span><b>{x.mass.toFixed(1)} Da</b></div>
  <div><span>Property changes</span><b>{x.changes.length?x.changes.join(", "):"minimal"}</b></div>
  <div><span>Interpretation</span><b>Heuristic only — not proof of functional significance</b></div>
 </>;
}
