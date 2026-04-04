import styled from "styled-components"

const StyledMarkdown = styled.div`
  & {
    font-size: 16px;
    color: ${props => props.theme.colors.text};
    line-height: 1.7;
    overflow: hidden;
  }

  & *:first-child {
    margin-top: 0;
  }

  & > p,
  & > ul,
  & > ol,
  & table,
  & blockquote,
  & pre,
  & img,
  & .katex-display {
    margin-top: 0;
    margin-bottom: 24px;
  }

  & p {
    overflow-x: scroll;
    word-break: break-all;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin: 11.2px 0 4.8px 0;
    font-weight: 700;
  }

  & h2 {
    margin-top: 64px;
    margin-bottom: 24px;
    font-size: 28px;
    padding-bottom: 12px;
    border-bottom: 2px solid ${props => props.theme.colors.border};
  }

  & h3 {
    margin-top: 48px;
    margin-bottom: 24px;
    font-size: 22.4px;
    padding-left: 12px;
    border-left: 4px solid #0ea5e9;
  }

  & h4 {
    margin-top: 32px;
    margin-bottom: 24px;
    font-size: 17.6px;
  }

  & h5 {
    font-size: 16px;
  }

  & h6 {
    font-size: 14.4px;
  }

  & strong {
    font-weight: 700;
  }

  & em {
    font-style: italic;
  }

  & blockquote {
    padding: 16px 24px;
    border-left: 4px solid #0ea5e9;
    background-color: transparent;

    & *:last-child {
      margin-bottom: 0;
    }
  }

  & blockquote blockquote {
    margin-top: 24px;
  }

  & table {
    border-collapse: collapse;
    width: 100%;
  }

  & th {
    border-bottom: 2px solid ${props => props.theme.colors.border};
    font-weight: 700;
  }

  & td {
    border-top: 1px solid ${props => props.theme.colors.border};
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  & td,
  th {
    padding: 8px;
  }

  & tr:first-child td {
    border-top: none;
  }

  & tr:nth-child(even) {
    background-color: ${props => props.theme.colors.tableBackground};
  }

  & tr:last-child td {
    border-bottom: none;
  }

  & p > code {
    word-break: break-all;
  }

  pre[class*="language-"] {
    background-color: #1e1e1e;
    position: relative;
    border-radius: 8px;
    padding: 20px 24px;
    margin: 0 0 24px 0;
    border: 1px solid rgba(148, 163, 184, 0.1);
  }

  pre[class*="language-"]::before {
    content: attr(data-language);
    position: absolute;
    top: 0;
    right: 12px;
    padding: 2px 10px;
    font-size: 11px;
    font-family: inherit;
    color: #64748b;
    background: rgba(148, 163, 184, 0.08);
    border-radius: 0 0 6px 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  & .copy-button {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 12px;
    font-size: 12px;
    font-family: inherit;
    color: #94a3b8;
    background: rgba(148, 163, 184, 0.1);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 6px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s, background 0.2s;
  }

  & pre:hover .copy-button {
    opacity: 1;
  }

  & .copy-button:hover {
    background: rgba(148, 163, 184, 0.25);
    color: #e2e8f0;
  }

  & *:not(pre) > code.language-text {
    padding: 1.6px 4.8px;
    font-size: 14.4px;
    background-color: ${props => props.theme.colors.inlineCodeBackground};
    font-weight: bold;
    color: ${props => props.theme.colors.text};
  }

  & h2 > code.language-text,
  & h3 > code.language-text,
  & h4 > code.language-text {
    font-size: inherit;
  }

  & tr:nth-child(even) code.language-text {
    background-color: ${props => props.theme.colors.inlineCodeBackgroundDarker};
  }

  & ul,
  & ol {
    padding-left: 32px;
  }

  & ol {
    list-style: decimal;
  }

  & ul {
    list-style: disc;
  }

  & ul ul {
    list-style: circle;
  }

  & ul ul ul {
    list-style: square;
  }

  & li {
    margin-bottom: 12.8px;
  }

  & li p {
    margin-top: 8px;
  }

  & pre {
    ::-webkit-scrollbar {
      height: 12px;
    }
    ::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.scrollTrack};
    }

    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.scrollHandle};
    }
  }

  & pre > code {
    font-size: 14.4px;
  }

  & img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }

  & figcaption {
    margin-top: 5px;
    text-align: center;
    color: #868e96;
    font-size: 12px;
    font-style: italic;
  }

  & hr {
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  & a {
    padding: 1.6px 0;
    color: ${props => props.theme.colors.text};
  }

  & a:hover {
    background-color: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.hoveredLinkText};
  }
`

export default StyledMarkdown
