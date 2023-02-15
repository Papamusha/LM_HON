(function (React$1, ReactDOM, d3, topojson) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  const useData = () => {
    const [data, setData] = React$1.useState(null);
    console.log(data);

    React$1.useEffect(() => {
      d3.json(jsonUrl).then(topology => {
        const { countries, land } = topology.objects;
        setData({
          land: topojson.feature(topology, land),
          interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
        });
      });
    }, []);

    return data;
  };

  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  const Marks = ({ data: { land, interiors } }) => (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', { className: "sphere", d: path({ type: 'Sphere', transform: scale[10000] })}),
      React.createElement( 'path', { className: "graticules", d: path(graticule()) }),
      land.features.map(feature => (
        React.createElement( 'path', { className: "land", d: path(feature) })
      )),
      React.createElement( 'path', { className: "interiors", d: path(interiors) })
    )
  );

  const width = 1800;
  const height = 900;

  const App = () => {
    const data = useData();

    if (!data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }

    return (
      React$1__default.createElement( 'svg', { width: width, height: height },
        React$1__default.createElement( Marks, { data: data })
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3, topojson));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZURhdGEuanMiLCJNYXJrcy5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganNvbiB9IGZyb20gJ2QzJztcbmltcG9ydCB7IGZlYXR1cmUsIG1lc2ggfSBmcm9tICd0b3BvanNvbic7XG5cbmNvbnN0IGpzb25VcmwgPSAnaHR0cHM6Ly91bnBrZy5jb20vd29ybGQtYXRsYXNAMi4wLjIvY291bnRyaWVzLTUwbS5qc29uJztcblxuZXhwb3J0IGNvbnN0IHVzZURhdGEgPSAoKSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGpzb24oanNvblVybCkudGhlbih0b3BvbG9neSA9PiB7XG4gICAgICBjb25zdCB7IGNvdW50cmllcywgbGFuZCB9ID0gdG9wb2xvZ3kub2JqZWN0cztcbiAgICAgIHNldERhdGEoe1xuICAgICAgICBsYW5kOiBmZWF0dXJlKHRvcG9sb2d5LCBsYW5kKSxcbiAgICAgICAgaW50ZXJpb3JzOiBtZXNoKHRvcG9sb2d5LCBjb3VudHJpZXMsIChhLCBiKSA9PiBhICE9PSBiKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCJpbXBvcnQgeyBnZW9OYXR1cmFsRWFydGgxLCBnZW9QYXRoLCBnZW9HcmF0aWN1bGUgfSBmcm9tICdkMyc7XG5cbmNvbnN0IHByb2plY3Rpb24gPSBnZW9OYXR1cmFsRWFydGgxKCk7XG5jb25zdCBwYXRoID0gZ2VvUGF0aChwcm9qZWN0aW9uKTtcbmNvbnN0IGdyYXRpY3VsZSA9IGdlb0dyYXRpY3VsZSgpO1xuXG5leHBvcnQgY29uc3QgTWFya3MgPSAoeyBkYXRhOiB7IGxhbmQsIGludGVyaW9ycyB9IH0pID0+IChcbiAgPGcgY2xhc3NOYW1lPVwibWFya3NcIj5cbiAgICA8cGF0aCBjbGFzc05hbWU9XCJzcGhlcmVcIiBkPXtwYXRoKHsgdHlwZTogJ1NwaGVyZScgfSl9IC8+XG4gICAgPHBhdGggY2xhc3NOYW1lPVwiZ3JhdGljdWxlc1wiIGQ9e3BhdGgoZ3JhdGljdWxlKCkpfSAvPlxuICAgIHtsYW5kLmZlYXR1cmVzLm1hcChmZWF0dXJlID0+IChcbiAgICAgIDxwYXRoIGNsYXNzTmFtZT1cImxhbmRcIiBkPXtwYXRoKGZlYXR1cmUpfSAvPlxuICAgICkpfVxuICAgIDxwYXRoIGNsYXNzTmFtZT1cImludGVyaW9yc1wiIGQ9e3BhdGgoaW50ZXJpb3JzKX0gLz5cbiAgPC9nPlxuKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IHVzZURhdGEgfSBmcm9tICcuL3VzZURhdGEnO1xuaW1wb3J0IHsgTWFya3MgfSBmcm9tICcuL01hcmtzJztcblxuY29uc3Qgd2lkdGggPSA5NjA7XG5jb25zdCBoZWlnaHQgPSA1MDA7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgY29uc3QgZGF0YSA9IHVzZURhdGEoKTtcblxuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm4gPHByZT5Mb2FkaW5nLi4uPC9wcmU+O1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8c3ZnIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9PlxuICAgICAgPE1hcmtzIGRhdGE9e2RhdGF9IC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIHJvb3RFbGVtZW50KTtcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImpzb24iLCJmZWF0dXJlIiwibWVzaCIsImdlb05h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