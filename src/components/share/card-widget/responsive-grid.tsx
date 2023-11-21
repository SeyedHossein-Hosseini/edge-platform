import React, { useEffect, useState, ReactElement } from 'react';
import { Responsive, Layouts, Layout } from 'react-grid-layout';
import sizeMe from 'react-sizeme';

import { localStore } from 'src/helpers/storage-helper';

import { CardWidget } from './card-widget';
import { ResponsiveGridProps } from './responsive-grid.props';
import { CardWidgetProps, ConfigProps } from './card-widget.props';

import { useStyle } from './responsive-grid.style';
import 'src/scss/grid-layout';

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  dashboardName,
  size,
  children,
  defaultLayout,
  removedItem,
}) => {
  const { width } = size;
  const classes = useStyle();

  const cols = { lg: 24, md: 12, sm: 6, xs: 1, xxs: 1 };
  const breakPointsSize = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const [ currentBreakPoints, setCurrentBreakPoints ] =
    useState<keyof typeof breakPointsSize>();

  const [ layouts, setLayouts ] = useState<Layouts>();
  const [ gridElms, setGridElms ] = useState<ReactElement[]>([]);
  const [ isInitial, setInitial ] = useState(true);

  const refs = React.useRef<
    React.RefObject<
      <P extends CardWidgetProps>(
          Wrapped: React.ComponentType<P>,
          config?: ConfigProps
      ) => React.ForwardRefExoticComponent<
        React.PropsWithoutRef<P> & React.RefAttributes<unknown>
      >
          >[]
          >([]);

  const onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    if (isInitial) return;
    setLayouts(allLayouts);
  };

  const saveToLS = (value: Layouts) => {
    const checkValue = JSON.stringify(value);
    localStore.set(dashboardName, checkValue);
  };

  const getCurrentBreakPoints = (currentWidth: number) => {
    if (currentWidth > breakPointsSize.lg) {
      return 'lg';
    } else if (currentWidth > breakPointsSize.md) {
      return 'md';
    } else if (currentWidth > breakPointsSize.sm) {
      return 'sm';
    } else if (currentWidth > breakPointsSize.xs) {
      return 'xs';
    } else if (currentWidth > breakPointsSize.xxs) {
      return 'xxs';
    }
  };

  const updateDashboardWidget = () => {
    setTimeout(() => {
      const dashboardStoreName = `${dashboardName}-dashboard`;

      const layoutBP = Object.keys(layouts);
      const wl = localStore.get(dashboardStoreName) ?
        JSON.parse(localStore.get(dashboardStoreName)) :
        undefined;

      if (wl) {
        wl.forEach((w: any) => {
          const wId = w.id;
          const wConfig: { [key: string]: any } = {};

          layoutBP.forEach((bp) => {
            // lg, md, sm, ...
            const items = layouts[bp]; // {}
            const pareItem = items.filter((item) => wId === item.i)[0];
            wConfig[bp] = pareItem;
          });

          w.config = wConfig;
        });

        localStore.set(
            dashboardStoreName,
            JSON.stringify(wl, (key: string, value: any) => {
              if (value === Infinity) {
                return 'Infinity';
              }
              return value;
            })
        );
      }
    });
  };

  const getConfigs = (refs: any[]): Layouts => {
    return refs.reduce(
        (init, ref) => {
          const config = ref.current.getGridConfig();
          return {
            lg: [ ...init.lg, config['lg'] ],
            md: [ ...init.md, config['md'] ],
            sm: [ ...init.sm, config['sm'] ],
            xs: [ ...init.xs, config['xs'] ],
            xxs: [ ...init.xxs, config['xxs'] ],
          };
        },
        { lg: [], md: [], sm: [], xs: [], xxs: [] }
    );
  };

  const childrenElms = React.useMemo(() => {
    if (!children.length) return;

    let newRefs: any[] = [];
    const newGridElms = children.map((child, index) => {
      const ref = React.createRef<typeof CardWidget>();
      newRefs = [ ...newRefs, ref ];
      // @ts-ignore
      return React.cloneElement(child, {
        key: index,
        ref,
        id: child.props.id,
      });
    });

    refs.current = newRefs;

    return newGridElms.map((val, idx) => {
      return <div key={idx}>{val}</div>;
    });
  }, [children.length]);

  useEffect(() => {
    if (width) {
      const breakPoint = getCurrentBreakPoints(width);
      setCurrentBreakPoints(breakPoint as keyof typeof breakPointsSize);
    }
  }, [width]);

  useEffect(() => {
    if (!refs.current.length || !currentBreakPoints) return;

    const newChildElms = childrenElms.map((item, idx) => {
      return (
        <div
          key={
            // @ts-ignore
            refs.current[idx].current.getGridConfig()[currentBreakPoints]['i']
          }
        >
          {item}
        </div>
      );
    });

    if (defaultLayout && (!layouts || removedItem)) {
      setLayouts(defaultLayout);
    } else if (layouts) {
      const lastItemIndex = refs.current.length - 1;
      // @ts-ignore-block
      const config = refs.current[lastItemIndex].current.getGridConfig();
      const updatedLayout = Object.keys(layouts).reduce((init, bp) => {
        return {
          ...init,
          [bp]: [ ...init[bp], config[bp] ],
        };
      }, layouts);
      setInitial(true);
      setLayouts(updatedLayout);
    } else {
      const configs: Layouts = getConfigs(refs.current);
      setLayouts(configs);
    }
    setGridElms(newChildElms);
  }, [ refs.current, currentBreakPoints, width ]);

  useEffect(() => {
    if (layouts) {
      saveToLS(layouts);
      updateDashboardWidget();

      if (isInitial) {
        setInitial(false);
      }
    }
  }, [layouts]);

  if (!currentBreakPoints) return <div></div>;

  return (
    <Responsive
      className={classes.layout}
      cols={cols}
      width={width}
      rowHeight={30}
      layouts={layouts}
      compactType="vertical"
      verticalCompact={true}
      containerPadding={[ 0, 0 ]}
      breakpoints={breakPointsSize}
      onLayoutChange={onLayoutChange}
      draggableHandle={'.grid_handle'}
      onBreakpointChange={(breakpoint) => {
        setCurrentBreakPoints(breakpoint as keyof typeof breakPointsSize);
      }}
    >
      {gridElms.length && gridElms.length === childrenElms.length ?
        gridElms :
        childrenElms}
    </Responsive>
  );
};

const ResponsiveGridSizeMe = sizeMe({ monitorWidth: true })(ResponsiveGrid);
export default ResponsiveGridSizeMe;
