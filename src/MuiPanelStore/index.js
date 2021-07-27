import get from 'lodash/get';
import React, { createContext, useEffect, useState } from 'react';
import MuiPanelManager from '../MuiPanelManager';

const DataContext = createContext(null);

function MuiPanelProvider(props) {
    const initialLayout = get(props, 'layout', []);
    const initialSettings = get(props, 'settings', {
        isCollapsed: false,
    });

    const [layout, setLayout] = useState(initialLayout);
    const [settings, setSettings] = useState(initialSettings);

    const handlePanelAnnouncement = ({ ref, children, side, notificationCount = 0, notificationColor, subTitle, shortText, iconInHeader = true, title, tooltip, icon, showIcon = true, noPanel = false }) => {
        const uniqueId = Math.random().toString(36).substring(7);
        setLayout(layout => [
            ...layout,
            {
                uniqueId,
                side,
                isVisible: false,
                asGroup: false,
                asEmbedded: false,
                parentId: null,
                iconInHeader,
                isCollapsed: false,
                ref,
                index: layout.length,
                showBadge: false,
                notificationCount,
                notificationColor,
                variant: 'standard',
                index: layout.length,
                subTitle,
                title,
                showIcon,
                shortText,
                tooltip,
                noPanel,
                icon,
                children,
            }
        ]);
        return uniqueId
    }

    const handleSetAsGroup = ({ uniqueId }) => {
        setLayout(layout.map(layoutObject => layoutObject.uniqueId === uniqueId
            ? { ...layoutObject, asGroup: !layoutObject.asGroup }
            : layoutObject));
    }

    const handleUnSetAsEmbedded = ({ uniqueId }) => {
        setLayout(layout.map(layoutObject => layoutObject.uniqueId === uniqueId
            ? { ...layoutObject, asGroup: false, asEmbedded: false, isVisible: false, parentId: null }
            : layoutObject));
    }

    const handlePanelAlerts = ({ uniqueId, notificationCount, notificationColor }) => {
        setLayout(layout.map(layoutObject => layoutObject.uniqueId === uniqueId
            ? { ...layoutObject, notificationCount, notificationColor }
            : layoutObject));
    }

    const handleToggleCollapse = ({ uniqueId }) => {
        setLayout(layout.map(layoutObject => layoutObject.uniqueId === uniqueId
            ? { ...layoutObject, isCollapsed: !layoutObject.isCollapsed }
            : layoutObject));
    }

    const handleSetAsEmbedded = ({ uniqueId, parentId }) => {
        const findParent = layout.find(layoutObject => layoutObject.uniqueId === parentId);
        if (findParent) {
            const updateEmbedded = layout.map(layoutObject => layoutObject.uniqueId === uniqueId
            ? { ...layoutObject, parentId, isVisible: true, side: findParent.side, asEmbedded: !layoutObject.asEmbedded }
            : layoutObject);
            const activateParent = updateEmbedded.map(layoutObject => layoutObject.uniqueId === parentId || layoutObject.parentId === parentId
                ? { ...layoutObject, isVisible: true }
                : layoutObject
            );
            setLayout(activateParent);
        }
    }

    const handleSetSide = ({ uniqueId }) => {
        setLayout(layout
            .map(layoutObject => (layoutObject.uniqueId === uniqueId || layoutObject.parentId === uniqueId)
                ? {
                    ...layoutObject,
                    isVisible: true,
                    side: layoutObject.side === 'right' ? "left" : 'right'
                }
                : { ...layoutObject, isVisible: false })
        );
    }

    const toggleIsCollapsed = () => {
        setSettings({...settings, isCollapsed: !settings.isCollapsed });
    }

    const handleSetVisible = ({ uniqueId }) => {
        const foundObject = layout.find(lo => lo.uniqueId === uniqueId);
        if (foundObject) {
            console.log("toggling visibility for id", uniqueId, foundObject);
            setLayout(layout => ([...layout.map(lo => {
                if (lo.side === foundObject.side) {
                    if (lo.uniqueId === foundObject.uniqueId) {
                        console.log('found by uniqueId')
                        return { ...lo, isVisible: !lo.isVisible, notificationCount: 0 }
                    } else if (lo.parentId === foundObject.uniqueId) {
                        console.log('found by parentId')
                        return { ...lo, isVisible: true }
                    } else {
                        console.log('not found')
                        return { ...lo, isVisible: false }
                    }
                }
                console.log('other side')
                return lo
            })]));
        }
    }

    useEffect(() => {
        localStorage.setItem(
            'material-ui-panel.layout',
            JSON.stringify(layout.map(l => ({ ...l, children: null, icon: null }))    )
        )
    }, [layout]);

    useEffect(() => { console.log("---"); layout.forEach(layoutObject => console.log(layoutObject)) }, [layout]);
    useEffect(() => { console.log('settings', settings) }, [settings]);

    return <DataContext.Provider
        value={{
            layout, setLayout,
            settings, setSettings,

            handleUnSetAsEmbedded,
            toggleIsCollapsed,
            handleSetAsGroup,
            handleSetVisible,
            handlePanelAlerts,
            handleSetSide,
            handleToggleCollapse,
            handleSetAsEmbedded,
            handlePanelAnnouncement
        }}>
        <MuiPanelManager
            allowRightClick={props.allowRightClick}
            showCollapseButton={props.showCollapseButton}>
            {props.children}
        </MuiPanelManager>
    </DataContext.Provider>
}

export default DataContext;
export { MuiPanelProvider };