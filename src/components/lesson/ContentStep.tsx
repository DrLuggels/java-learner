interface ContentStepProps {
  content: string;
  onComplete: () => void;
}

export default function ContentStep({ content, onComplete }: ContentStepProps) {
  return (
    <div className="space-y-4">
      <div
        className="lesson-content prose-dark"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
      <button
        onClick={onComplete}
        className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors text-sm font-medium"
      >
        Verstanden, weiter
      </button>
    </div>
  );
}

function renderMarkdown(md: string): string {
  let html = md;
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/```java\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/```\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  html = html.replace(/\n{2,}/g, '</p><p>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><(h[23]|ul|ol|pre|blockquote)/g, '<$1');
  html = html.replace(/<\/(h[23]|ul|ol|pre|blockquote)><\/p>/g, '</$1>');
  html = html.replace(/<p><\/p>/g, '');
  return html;
}
