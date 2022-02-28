import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Checkbox, Typography } from '@material-ui/core';



const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  }
});

export function TreeViewPer({ data, setData }) {
  const classes = useStyles();


  const handleChangeActive = (checked, id) => {

    let res = data.map(item => {

      if (id.match(item.id.split("\\.")[0])) {

        if ('CLUBMEMBER\\..*' === item.id && id === 'CLUBMEMBER\\.permisson_manager CLUBMEMBER\\.update') {
          return { ...item }
        }

        if ('CLUBMEMBER\\.permisson_manager CLUBMEMBER\\.update' === item.id && id === 'CLUBMEMBER\\..*') {
          return { ...item }
        }

        if (item.id === id) {
          let arrChild = item.children.map(child => {
            return { ...child, active: checked }
          })
          
          return { ...item, active: checked, children: arrChild }
        }

        let arrChild = item.children.map(child => {
          if (child.id === id) {
            return { ...child, active: checked }
          }

          return child
        })

        // let check = item.children.length === countTrue ? true : false
        // let check2 = checked ? check : false

        return { ...item, active: checked ? item.active : false, children: arrChild }
      }

      return item

    })

    setData(res)

  }





















  const renderTree = (nodes) => {

    const elements = [];

    nodes.forEach((v, k) => {
      const { id, children, active } = v;
      const label = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {
            id !== "root" && (
              <Checkbox
                id={`checkbox-${k}`}
                //   className={classes.globalFilterCheckbox}
                checked={active}
                onChange={(event, checked) => handleChangeActive(checked, id)}
                color="primary"
              />
            )
          }
          <Typography variant="caption">
            {v.name}
          </Typography>
        </div>
      );
      elements.push(
        children && children.length > 0 ? (
          <TreeItem key={id} nodeId={id} label={label}>
            {/* {createOrgStructureLevel(children)} */}
            {Array.isArray(children) ? renderTree(children) : null}

          </TreeItem>
        ) : (
            <TreeItem key={id} nodeId={id} label={label} />
          ),
      )
    });
    return elements;
  }

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    // onNodeToggle={(event, nodeIds) => console.log(event, nodeIds)}
    >
      {renderTree(data)}
    </TreeView>
  );
}
