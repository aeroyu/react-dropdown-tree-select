import React from 'react'
import PropTypes from 'prop-types'
import TreeNode from '../tree-node'

const shouldRenderNode = (node, searchModeOn, data) => {
  if (searchModeOn || node.expanded) return true

  const parent = node._parent && data.get(node._parent)
  // if it has a parent, then check parent's state.
  // otherwise root nodes are always rendered
  return !parent || parent.expanded
}

const getNodes = props => {
  const { data, keepTreeOnSearch, searchModeOn, onAction, onChange, onCheckboxChange, onNodeToggle } = props
  const items = []
  data.forEach((node, key) => {
    if (shouldRenderNode(node, searchModeOn, data)) {
      items.push(
        <TreeNode
          keepTreeOnSearch={keepTreeOnSearch}
          key={key}
          node={node}
          searchModeOn={searchModeOn}
          onChange={onChange}
          onCheckboxChange={onCheckboxChange}
          onNodeToggle={onNodeToggle}
          onAction={onAction}
        />
      )
    }
  })
  return items
}

const Tree = props => {
  const { searchModeOn } = props

  return <ul className={`root ${searchModeOn ? 'searchModeOn' : ''}`}>{getNodes(props)}</ul>
}

Tree.propTypes = {
  data: PropTypes.object,
  keepTreeOnSearch: PropTypes.bool,
  searchModeOn: PropTypes.bool,
  onChange: PropTypes.func,
  onNodeToggle: PropTypes.func,
  onAction: PropTypes.func,
  onCheckboxChange: PropTypes.func
}

export default Tree
