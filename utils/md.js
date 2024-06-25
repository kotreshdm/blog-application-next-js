import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

export default new MarkdownIt({
  highlight: (str, lang) => {
    const language = lang && hljs.getLanguage(lang) ? lang : "js";

    try {
      const highlightedCode = hljs.highlight(language, str, true).value;
      return `<pre class="hljs"><code>${highlightedCode}</code></pre>`;
    } catch (error) {
      return "";
    }
  },
});
