import {openDB} from 'idb';
import {jobs, type Job, type Inspection} from './model';
const db = openDB('loophouse',1,{upgrade(d){d.createObjectStore('jobs',{keyPath:'id'});d.createObjectStore('inspections',{keyPath:'jobId'});d.createObjectStore('meta')}});
export async function initialize(){const d=await db; const tx=d.transaction(['jobs','meta'],'readwrite');if(!await tx.objectStore('meta').get('seeded')) {for(const job of jobs) await tx.objectStore('jobs').put(job);await tx.objectStore('meta').put(true,'seeded')}await tx.done}
export async function allJobs():Promise<Job[]>{return (await db).getAll('jobs')}
export async function allInspections():Promise<Inspection[]>{return (await db).getAll('inspections')}
export async function saveInspection(i:Inspection){await (await db).put('inspections',i)}
export async function reset(){const d=await db;const tx=d.transaction(['jobs','inspections','meta'],'readwrite');await tx.objectStore('jobs').clear();await tx.objectStore('inspections').clear();for(const job of jobs)await tx.objectStore('jobs').put(job);await tx.objectStore('meta').put(true,'seeded');await tx.done}
