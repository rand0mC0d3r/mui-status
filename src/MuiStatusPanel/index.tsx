// import { Popover } from '@material-ui/core'
// import React, { useContext, useEffect, useState } from 'react'
// import { StatusObject } from '../index.types'
// import MupStatus from '../MuiStatus'
// import DataProvider from '../MuiStore'

// const MuiStatusPanel = ({
//   id,
//   secondary = false,
//   elevation = 4,
//   style,
//   tooltip = "",
//   children,
//   popoverStyle,
//   popoverClassName,
//   popover
// } : {
//   id: string,
//   secondary?: boolean,
//   elevation?: number,
//   style?: any,
//   tooltip?: any,
//   children?: any,
//   popoverStyle?: any,
//   popoverClassName?: any,
//   popover?: any,
// }) => {
//   const { status, popoverComponent } = useContext(DataProvider)
//   const [statusObject, setStatusObject] = useState<StatusObject | null>(null)

//   const [anchorEl, setAnchorEl] = useState(null)
//   const [isToggled, setIsToggled] = useState(false)
//   const open = Boolean(anchorEl)

//   useEffect(() => {
//     const foundObject = status.find(item => item.uniqueId === id)
//     if (statusObject === null && foundObject) {
//       setStatusObject(foundObject)
//     }
//   }, [status, id, statusObject])

//   const onClick = (e: any) => {
//     setAnchorEl(e.currentTarget)
//     setIsToggled(e.pageY < screen.height / 2)
//   }
//   const onClose = () => setAnchorEl(null)

//   return <>
//     <MupStatus {...{ id, tooltip, secondary, onClick }} style={{ ...style, minWidth: '24px' }}>
//       {children}
//     </MupStatus>
//     {popoverComponent !== undefined
//       ? <>
//         {popoverComponent({
//           position: isToggled? 'top': 'bottom',
//           isSecondary: statusObject?.secondary,
//           popover,
//           popoverProps: {
//             anchorEl,
//             onClose,
//             open,
//             style:{ marginTop: `${(isToggled ? 1 : -1) * 12}px` },
//             anchorOrigin:{
//               vertical: isToggled ? 'top' : 'bottom',
//               horizontal: statusObject?.secondary ? 'right' : 'left'
//             },
//             transformOrigin:{
//               vertical: !isToggled ? 'bottom' : 'top',
//               horizontal: statusObject?.secondary ? 'right' : 'left'
//             }
//           }
//         })}
//       </>
//       : <>
//         <Popover {...{ open, anchorEl, onClose, elevation }}
//           id={`${id}-status-popover`}
//           className={popoverClassName}
//           style={{ ...popoverStyle, marginTop: `${(isToggled ? 1 : -1) * 12}px` }}
//           anchorOrigin={{
//             vertical: isToggled ? 'top' : 'bottom',
//             horizontal: statusObject?.secondary ? 'right' : 'left'
//           }}
//           transformOrigin={{
//             vertical: !isToggled ? 'bottom' : 'top',
//             horizontal: statusObject?.secondary ? 'right' : 'left'
//           }}
//         >
//           {popover}
//         </Popover>
//       </>}
//   </>
// }

// export default MuiStatusPanel
