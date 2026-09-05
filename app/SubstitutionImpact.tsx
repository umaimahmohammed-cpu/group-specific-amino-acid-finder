type Props={from:string;to:string};

type AAProp={charge:string;polarity:string;size:string;hydropathy:number;mass:number};

const AA:Record<string,AAProp>={
 A:{charge:"neutral",polarity:"nonpolar",size:"small",hydropathy:1.8,mass:89.09},R:{charge:"positive",polarity:"polar",size:"large",hydropathy:-4.5,mass:174.20},N:{charge:"neutral",polarity:"polar",size:"medium",hydropathy:-3.5,mass:132.12},D:{charge:"negative",polarity:"polar",size:"small",hydropathy:-3.5,mass:133.10},C:{charge:"neutral",polarity:"polar",size:"small",hydropathy:2.5,mass:121.16},Q:{charge:"neutral",polarity:"polar",size:"medium",hydropathy:-3.5,mass:146.15},E:{charge:"negative",polarity:"polar",size:"medium",hydropathy:-3.5,mass:147.13},G:{charge:"neutral",polarity:"nonpolar",size:"small",hydropathy:-0.4,mass:75.07},H:{charge:"positive/neutral",polarity:"polar",size:"medium",hydropathy:-3.2,mass:155.16},I:{charge:"neutral",polarity:"nonpolar",size:"medium",hydropathy:4.5,mass:131.17},L:{charge:"neutral",polarity:"nonpolar",size:"medium",hydropathy:3.8,mass:131.17},K:{charge:"positive",polarity:"polar",size:"large",hydropathy:-3.9,mass:146.19},M:{charge:"neutral",polarity:"nonpolar",size:"medium",hydropathy:1.9,mass:149.21},F:{charge:"neutral",polarity:"nonpolar",size:"large",hydropathy:2.8,mass:165.19},P:{charge:"neutral",polarity:"nonpolar",size:"small",hydropathy:-1.6,mass:115.13},S:{charge:"neutral",polarity:"polar",size:"small",hydropathy:-0.8,mass:105.09},T:{charge:"neutral",polarity:"polar",size:"small",hydropathy:-0.7,mass:119.12},W:{charge:"neutral",polarity:"nonpolar",size:"large",hydropathy:-0.9,mass:204.23},Y:{charge:"neutral",polarity:"polar",size:"large",hydropathy:-1.3,mass:181.19},V:{charge:"neutral",polarity:"nonpolar",size:"small",hydropathy:4.2,mass:117.15},
};

function impact(from:string,to:string){const a=AA[from],b=AA[to];if(!a||!b||from===to)return null;const hydro=Math.abs(b.hydropathy-a.hydropathy),mass=Math.abs(b.mass-a.mass);const score=(a.charge!==b.charge?2:0)+(a.polarity!==b.polarity?1:0)+(a.size!==b.size?1:0)+(hydro>=2?1:0)+(mass>=30?1:0);return{a,b,hydro,mass,level:score>=4?"Strong change":score>=2?"Moderate change":"Conservative change"}}

export default function SubstitutionImpact({from,to}:Props){
 if(from==="-"||to==="-")return <div className="impactCompact"><div className="impactTitle"><b>{from} → {to}</b><span>Gap / indel</span></div></div>;
 const x=impact(from,to);if(!x)return null;
 return <div className="impactCompact">
  <div className="impactTitle"><b>{from} → {to}</b><span>{x.level}</span></div>
  <div className="impactProperties">
   <span><strong>Charge</strong> {x.a.charge} → {x.b.charge}</span>
   <span><strong>Polarity</strong> {x.a.polarity} → {x.b.polarity}</span>
   <span><strong>Size</strong> {x.a.size} → {x.b.size}</span>
  </div>
  <details className="impactMore"><summary>More details</summary><p>Hydropathy Δ {x.hydro.toFixed(1)} · Approx. mass Δ {x.mass.toFixed(1)} Da</p><small>Physicochemical heuristic only — not evidence of functional significance.</small></details>
 </div>;
}
