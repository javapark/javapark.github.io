import React, { useState, useEffect } from "react"
import styled from "styled-components"

import useOffsetTop from "hooks/useOffsetTop"

import Toc from "./Toc"
import StyledMarkdown from "./StyledMarkdown"

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`

const Body = ({ html }) => {
  const [toc, setToc] = useState([])

  const [ref, offsetTop] = useOffsetTop()

  useEffect(() => {
    setToc(
      Array.from(
        document.querySelectorAll("#article-body > h2, #article-body > h3")
      )
    )
  }, [])

  useEffect(() => {
    const codeBlocks = document.querySelectorAll("#article-body pre[class*='language-']")
    codeBlocks.forEach(pre => {
      // 언어 라벨 추가
      const code = pre.querySelector("code[class*='language-']")
      if (code) {
        const match = code.className.match(/language-(\w+)/)
        if (match && match[1] !== "text") {
          pre.setAttribute("data-language", match[1])
        }
      }

      // 복사 버튼 추가
      if (pre.querySelector(".copy-button")) return
      const btn = document.createElement("button")
      btn.className = "copy-button"
      btn.textContent = "Copy"
      btn.addEventListener("click", () => {
        if (code) {
          navigator.clipboard.writeText(code.innerText).then(() => {
            btn.textContent = "Copied!"
            setTimeout(() => { btn.textContent = "Copy" }, 2000)
          })
        }
      })
      pre.appendChild(btn)
    })
  }, [])

  return (
    <Wrapper>
      <Toc items={toc} articleOffset={offsetTop} />

      <StyledMarkdown
        id="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
        ref={ref}
      />
    </Wrapper>
  )
}

export default Body
