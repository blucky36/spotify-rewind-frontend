import React from "react"
import moment from "moment"

const SelectVersion = (props) => (
  <>
    <option value={`${props.version.id}`}>
      {moment(props.version.created_at).format("MMM Do YY")}
    </option>
    <option value={`${props.version.id}`}>
      {moment(props.version.created_at).format("MMM Do YY")}
    </option>
  </>
)

 export default SelectVersion
