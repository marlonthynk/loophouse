import { jsPDF } from 'jspdf';
import { sections, type Inspection, type Job } from './model';

export async function downloadReport(job: Job, i: Inspection) {
  const pdf = new jsPDF();
  let y = 20;

  const page = () => {
    pdf.addPage();
    y = 20;
  };

  const text = (value: string, size = 10, bold = false) => {
    pdf.setFont('helvetica', bold ? 'bold' : 'normal');
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(value, 170) as string[];
    for (const line of lines) {
      if (y > 278) {
        page();
      }
      pdf.text(line, 20, y);
      y += size * 0.48 + 2;
    }
  };

  text('LOOPHOUSE  /  INSPECTION REPORT', 16, true);
  text(job.address, 14, true);
  text(`${job.city} | ${job.type}`);
  text(
    `Inspector: ${i.inspector} | Completed: ${i.completed ? new Date(i.completed).toLocaleString('en-GB') : 'Draft'}`,
  );
  y += 5;

  for (const s of sections) {
    text(s, 13, true);
    text(`Condition: ${i.answers[s].condition}`);
    if (i.answers[s].notes) {
      text(i.answers[s].notes);
    }

    for (const p of i.photos.filter((p) => p.section === s)) {
      const data = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () => reject(r.error);
        r.readAsDataURL(p.blob);
      });
      if (y > 195) {
        page();
      }
      pdf.addImage(data, 'JPEG', 20, y, 80, 55, undefined, 'FAST');
      y += 60;
      if (p.caption) {
        text(p.caption);
      }
    }
    y += 4;
  }

  text('Overall summary', 13, true);
  text(i.summary || 'No summary provided.');
  text('Recommended follow-up', 13, true);
  text(i.followup || 'None provided.');
  pdf.save(`loophouse-${job.id}-report.pdf`);
}
