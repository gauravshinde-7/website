import React from 'react'
import { graphql } from 'gatsby'
import DetailText from '~components/common/detail-text'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import StateList from '~components/pages/data/state-list'
import StatesNoScriptNav from '~components/pages/data/state-nav-no-script'
import StatesNav from '~components/common/state-nav'
import SummaryTable from '~components/common/summary-table'
import { SyncInfobox } from '~components/common/infobox'

export default ({ data }) => {
  const stateNavList = []
  data.allCovidStateInfo.edges.forEach(({ node }) => {
    stateNavList.push(node)
  })
  return (
    <Layout
      title="Our Data"
      description="Our most up-to-date data on COVID-19 in the US."
      navigation={data.contentfulNavigationGroup.pages}
    >
      <ContentfulContent
        className="module-content"
        content={data.dataPreamble.content.childMarkdownRemark.html}
        id={data.dataPreamble.contentful_id}
      />
      <SyncInfobox />
      <SummaryTable data={data.covidUs} showOutcomes={false} />
      <DetailText>
        <span
          className="module-content"
          dangerouslySetInnerHTML={{
            __html: data.dataSummaryFootnote.content.childMarkdownRemark.html,
          }}
        />
      </DetailText>
      <StatesNav title="Totals by state" stateList={stateNavList} />

      <StatesNoScriptNav stateList={data.allCovidStateInfo.edges} />
      <StateList
        states={data.allCovidStateInfo.edges}
        stateData={data.allCovidState.edges}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    dataSummaryFootnote: contentfulSnippet(
      slug: { eq: "data-summary-footnote" }
    ) {
      id
      contentful_id
      name
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    dataPreamble: contentfulSnippet(slug: { eq: "data-preamble" }) {
      id
      contentful_id
      name
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    covidUs {
      positive
      negative
      pending
      hospitalizedCurrently
      hospitalizedCumulative
      inIcuCurrently
      inIcuCumulative
      recovered
      onVentilatorCurrently
      onVentilatorCumulative
      death
      totalTestResults
    }
    allCovidStateInfo(sort: { fields: name }) {
      edges {
        node {
          name
          state
          notes
          covid19Site
          covid19SiteSecondary
          twitter
        }
      }
    }
    allCovidState {
      edges {
        node {
          totalTestResults
          state
          dataQualityGrade
          dateModified
          positive
          negative
          pending
          hospitalizedCurrently
          hospitalizedCumulative
          inIcuCurrently
          inIcuCumulative
          recovered
          onVentilatorCurrently
          onVentilatorCumulative
          death
        }
      }
    }
    contentfulNavigationGroup(slug: { eq: "data" }) {
      pages {
        ... on ContentfulPage {
          title
          link: slug
        }
        ... on ContentfulNavigationLink {
          title
          link: url
        }
      }
    }
  }
`
