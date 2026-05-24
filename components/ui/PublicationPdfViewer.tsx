"use client";

type Props = {
  src: string;
  title: string;
  fileName: string;
  period?: string;
};

export function PublicationPdfViewer({ src, title, fileName, period }: Props) {
  const pdfSrc = `${src}#page=1&view=FitH`;

  return (
    <div className="publication-pdf">
      {period && <span className="project-gallery-period">{period}</span>}

      <div className="publication-pdf-frame">
        <iframe
          src={pdfSrc}
          title={`${title} — PDF preview`}
          className="publication-pdf-iframe"
        />
      </div>

      <div className="publication-pdf-toolbar">
        <a href={src} download={fileName} className="publication-pdf-action">
          Download PDF
        </a>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="publication-pdf-action"
        >
          Open in new tab
        </a>
        <p className="publication-pdf-hint">Scroll inside the preview to read all pages.</p>
      </div>
    </div>
  );
}
