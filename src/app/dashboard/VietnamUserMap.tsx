import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import vnTopo from './geo_data/geo.json';

// You'll need to create this type based on your geo.json structure
type GeoFeature = {
  id: string;
  properties: {
    GID_0: string;
    NAME_0: string;
    GID_1: string;
    NAME_1: string;
    VARNAME_1: string;
    NL_NAME_1: string;
    TYPE_1: string;
    ENGTYPE_1: string;
    CC_1: string;
    HASC_1: string;
  };
};

type UserDistribution = {
  [key: string]: number;
};

interface VietnamUserMapProps {
  userDistribution: UserDistribution;
}

const VietnamUserMap: React.FC<VietnamUserMapProps> = ({ userDistribution }) => {
  const maxUsers = Math.max(...Object.values(userDistribution));

  const getColor = (users: number) => {
    const intensity = users / maxUsers;
    return `rgba(0, 128, 0, ${intensity})`;  // Green color with varying opacity
  };

  const [tooltipContent, setTooltipContent] = React.useState("");

  return (
    <div style={{ position: 'relative' }}>
      <ComposableMap
        projectionConfig={{ scale: 1800 }}
        width={980}
        height={700}
        style={{
          width: '100%',
          height: '700',
        }}
      >
        <ZoomableGroup center={[106, 16]}>
          <Geographies geography={vnTopo}>
            {({ geographies }) => {
              return geographies.map(
                (geography, i) =>
                  geography.id !== 'ATA' && (
                    <Geography
                      key={i}
                      geography={geography}
                      onMouseEnter={() => {
                        const regionName = geography.properties.NAME_1;
                        const users = userDistribution[geography.properties.VARNAME_1 || geography.properties.NAME_1] || 0;
                        setTooltipContent(`${regionName}: ${users} Users`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: getColor(userDistribution[geography.properties.VARNAME_1 || geography.properties.NAME_1] || 0),
                          stroke: "#000000",
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill: getColor(userDistribution[geography.properties.VARNAME_1 || geography.properties.NAME_1] || 0),
                          stroke: "#ED1C24",
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
                    />
                  ),
              )
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {tooltipContent && (
        <div
          style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px 10px',
            pointerEvents: 'none',
            left: '50%',
            top: '10px',
            transform: 'translateX(-50%)',
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default VietnamUserMap;