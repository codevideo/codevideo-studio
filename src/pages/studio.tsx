import * as React from "react"
import { StudioPage } from "../components/pages/studio/StudioPage"
import { Layout } from "../components/layout/Layout"

export default function Home() {
  return <Layout withHeader={true}><StudioPage initialActions={[]} tokenizerCode="" /></Layout>
}