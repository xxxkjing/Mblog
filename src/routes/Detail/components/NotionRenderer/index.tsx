import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    await Promise.all([
      import("prismjs/components/prism-markup-templating.js"),
      import("prismjs/components/prism-markup.js"),
      import("prismjs/components/prism-bash.js"),
      import("prismjs/components/prism-c.js"),
      import("prismjs/components/prism-cpp.js"),
      import("prismjs/components/prism-csharp.js"),
      import("prismjs/components/prism-docker.js"),
      import("prismjs/components/prism-java.js"),
      import("prismjs/components/prism-js-templates.js"),
      import("prismjs/components/prism-coffeescript.js"),
      import("prismjs/components/prism-diff.js"),
      import("prismjs/components/prism-git.js"),
      import("prismjs/components/prism-go.js"),
      import("prismjs/components/prism-graphql.js"),
      import("prismjs/components/prism-handlebars.js"),
      import("prismjs/components/prism-less.js"),
      import("prismjs/components/prism-makefile.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-objectivec.js"),
      import("prismjs/components/prism-ocaml.js"),
      import("prismjs/components/prism-python.js"),
      import("prismjs/components/prism-reason.js"),
      import("prismjs/components/prism-rust.js"),
      import("prismjs/components/prism-sass.js"),
      import("prismjs/components/prism-scss.js"),
      import("prismjs/components/prism-solidity.js"),
      import("prismjs/components/prism-sql.js"),
      import("prismjs/components/prism-stylus.js"),
      import("prismjs/components/prism-swift.js"),
      import("prismjs/components/prism-wasm.js"),
      import("prismjs/components/prism-yaml.js"),
    ])
    return m.Code
  })
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
  }
  
  /* Reset all notion elements to prevent doubling */
  .notion-block,
  .notion-h1,
  .notion-h2,
  .notion-h3,
  .notion-text,
  .notion-image,
  .notion-callout,
  .notion-quote,
  .notion-code,
  .notion-list,
  .notion-divider {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  /* Natural editor-like spacing - minimal gaps */
  .notion-h1,
  .notion-h1.notion-h1 {
    margin-top: 0.75rem !important;
  }
  
  .notion-h2,
  .notion-h2.notion-h2 {
    margin-top: 0.5rem !important;
  }
  
  .notion-h3,
  .notion-h3.notion-h3 {
    margin-top: 0.4rem !important;
  }
  
  /* Text and paragraph elements - very tight */
  .notion-text,
  p {
    margin-top: 0.25rem !important;
  }
  
  /* Images get same spacing as text */
  .notion-image,
  .notion-image-block,
  .notion-asset-wrapper,
  .notion-asset-wrapper-image {
    margin-top: 0.25rem !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
  }
  
  /* Override any intrinsic image spacing */
  .notion-image img,
  .notion-asset-wrapper img,
  .notion-asset-wrapper-image img {
    margin: 0 !important;
    padding: 0 !important;
    display: block;
  }
  
  /* Ensure consistent spacing for image captions */
  .notion-image-caption,
  .notion-asset-caption {
    margin: 0.2rem 0 0 0 !important;
    padding: 0 !important;
  }
  
  /* Lists and other elements - minimal spacing */
  .notion-list,
  .notion-callout,
  .notion-quote,
  .notion-code {
    margin-top: 0.3rem !important;
  }
  
  /* Dividers - slightly more space */
  .notion-divider {
    margin-top: 0.6rem !important;
  }
  
  /* Remove top margin from first elements to prevent extra space at top */
  .notion-h1:first-child,
  .notion-h2:first-child,
  .notion-h3:first-child,
  .notion-text:first-child,
  .notion-image:first-child,
  .notion-image-block:first-child,
  .notion-asset-wrapper:first-child,
  .notion-asset-wrapper-image:first-child,
  .notion-list:first-child,
  .notion-callout:first-child,
  .notion-quote:first-child,
  .notion-code:first-child,
  p:first-child {
    margin-top: 0 !important;
  }
  
  /* Special case: minimal space after title */
  .notion-title + .notion-h1,
  .notion-title + .notion-h2,
  .notion-title + .notion-h3,
  .notion-title + .notion-text,
  .notion-title + .notion-image,
  .notion-title + .notion-image-block,
  .notion-title + .notion-asset-wrapper,
  .notion-title + .notion-asset-wrapper-image {
    margin-top: 0.2rem !important;
  }
`
