import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

export const generateConstancia = async (name: string) => {
	const response = await fetch("/constancia.pdf");
	const pdfBytes = await response.arrayBuffer();
	const pdfDoc = await PDFDocument.load(pdfBytes);
	const page = pdfDoc.getPage(0);

	const text = name;
	const fontSize = 29;

	const subTitle = "Staff del evento";
	const subTitleFontSize = 15;

	const fontTitle = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
	const subFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
	const textWidth = fontTitle.widthOfTextAtSize(text, fontSize);
	const subTitleWith = fontTitle.widthOfTextAtSize(subTitle, subTitleFontSize);

	const { width, height } = page.getSize();

	const titleY = height / 1.78;
	page.drawRectangle({
		x: (width - textWidth) / 2,
		y: titleY,
		width: textWidth,
		height: fontSize,
		color: rgb(1, 1, 1),
	});

	page.drawText(text, {
		x: (width - textWidth) / 2,
		y: titleY,
		size: fontSize,
		font: fontTitle,
		color: rgb(201 / 255, 96 / 255, 120 / 255),
	});

	const subTitleY = height / 2.05;

	page.drawRectangle({
		x: (width - subTitleWith) / 2,
		y: subTitleY,
		width: subTitleWith,
		height: subTitleFontSize,
		color: rgb(1, 1, 1),
	});

	page.drawText(subTitle, {
		x: (width - subTitleWith) / 2,
		y: subTitleY,
		size: subTitleFontSize,
		font: subFont,
		color: rgb(27 / 255, 27 / 255, 27 / 255),
	});

	const pdfOut = await pdfDoc.save();
	const blob = new Blob([pdfOut.buffer as ArrayBuffer], {
		type: "application/pdf",
	});
	saveAs(blob, `constancia-${name}.pdf`);
};
