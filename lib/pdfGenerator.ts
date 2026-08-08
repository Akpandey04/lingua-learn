import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Lesson, VocabWord, DialogueLine, VocabularyModule, DialogueModule } from '@/types/domain';

export function generateLessonNotes(lesson: Lesson, courseContext?: { languageName?: string, level?: string, unitTitle?: string }) {
  const doc = new jsPDF();
  
  // Define Theme Colors (Matching LinguaLearn Teal theme)
  const primaryColor = [20, 184, 166]; // Teal 500
  const secondaryColor = [241, 245, 249]; // Slate 100
  const textColor = [15, 23, 42]; // Slate 900
  const mutedTextColor = [100, 116, 139]; // Slate 500

  // Header Title
  doc.setFontSize(22);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('LinguaLearn Lesson Notes', 14, 20);

  // Lesson Metadata
  doc.setFontSize(12);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`Lesson: ${lesson.title}`, 14, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  if (courseContext) {
    const ctxString = [courseContext.languageName, courseContext.level, courseContext.unitTitle].filter(Boolean).join(' • ');
    if (ctxString) {
      doc.text(ctxString, 14, 36);
    }
  }

  let currentY = 45;

  // Extract vocabulary and sentences from modules
  const vocabularies: VocabWord[] = [];
  const dialogueLines: DialogueLine[] = [];

  lesson.modules.forEach(m => {
    if (m.type === 'vocabulary') {
      vocabularies.push(...(m as VocabularyModule).config.words);
    } else if (m.type === 'dialogue') {
      dialogueLines.push(...(m as DialogueModule).config.lines);
    }
  });

  // 1. Vocabulary Section
  if (vocabularies.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Vocabulary', 14, currentY);
    currentY += 5;

    const vocabData = vocabularies.map((v: VocabWord) => [
      v.nativeWord,
      v.englishMeaning,
      v.pronunciation || '-'
    ]);

    (doc as any).autoTable({
      startY: currentY,
      head: [['Word', 'Meaning', 'Pronunciation']],
      body: vocabData,
      theme: 'grid',
      headStyles: { fillColor: primaryColor, textColor: 255 },
      alternateRowStyles: { fillColor: secondaryColor },
      styles: { cellPadding: 4, fontSize: 10, textColor: textColor, font: 'helvetica' },
      columnStyles: {
        0: { fontStyle: 'bold' }
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;
  }

  // 2. Sentences / Dialogues Section
  const sentencesData: string[][] = [];

  dialogueLines.forEach(line => {
    if (line.text && line.translation) {
      sentencesData.push([line.text, line.translation]);
    }
  });

  if (sentencesData.length > 0) {
    // Add page break if not enough space
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Sentences & Dialogue', 14, currentY);
    currentY += 5;

    (doc as any).autoTable({
      startY: currentY,
      head: [['Phrase', 'Translation']],
      body: sentencesData,
      theme: 'grid',
      headStyles: { fillColor: primaryColor, textColor: 255 },
      alternateRowStyles: { fillColor: secondaryColor },
      styles: { cellPadding: 4, fontSize: 10, textColor: textColor, font: 'helvetica' },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: '50%' },
        1: { cellWidth: '50%' }
      }
    });
  }

  // Save the PDF
  const safeTitle = lesson.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`lingualearn_notes_${safeTitle}.pdf`);
}
