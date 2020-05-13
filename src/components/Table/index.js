import React from 'react'

import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import {Paper} from 'components'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import styles from './index.module.scss'

// https://www.npmjs.com/package/react-super-responsive-table

const RSRTable = () => {
  return (
    <Paper inset>
      <Table className={styles.table}>
        <Thead>
          <Tr>
            <Th>Event</Th>
            <Th>Date</Th>
            <Th>Location</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Tablescon</Td>
            <Td>9 April 2019</Td>
            <Td>East Annex</Td>
            <Td>
              <i className='far fa-edit' />
            </Td>
            <Td>
              <i className='far fa-trash-alt' />
            </Td>
          </Tr>
          <Tr>
            <Td>Capstone Data</Td>
            <Td>19 May 2019</Td>
            <Td>205 Gorgas</Td>
            <Td>
              <i className='far fa-edit' />
            </Td>
            <Td>
              <i className='far fa-trash-alt' />
            </Td>
          </Tr>
          <Tr>
            <Td>Tuscaloosa D3</Td>
            <Td>29 June 2019</Td>
            <Td>Github</Td>
            <Td>
              <i className='far fa-edit' />
            </Td>
            <Td>
              <i className='far fa-trash-alt' />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Paper>
  )
}

export default RSRTable
