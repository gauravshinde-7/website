import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import downloadDataStyles from './download-data.module.scss'

export default ({ state }) => (
  <>
    <h3 className={downloadDataStyles.header}>Get the data as:</h3>
    <p>
      <a
        href={`/data/download/${slug(state.name)}-history.csv`}
        className={downloadDataStyles.button}
      >
        CSV File
      </a>
      <a
        href="https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRwAqp96T9sYYq2-i7Tj0pvTf6XVHjDSMIKBdZHXiCGGdNC0ypEU9NbngS8mxea55JuCFuua1MUeOj5/pubhtml"
        className={downloadDataStyles.button}
      >
        Spreadsheet
      </a>
      <Link to="/data/api" className={downloadDataStyles.button}>
        JSON API
      </Link>
    </p>
  </>
)