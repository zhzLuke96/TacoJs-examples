import * as Taco from '@tacopie/taco';
import {Mptr, unref, useMemo} from '@tacopie/taco';

export const Table = ({datasource = [] as Mptr<Record<string, any>[]>}) => {
  const heads = useMemo(() => Object.keys(unref(datasource)));

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>{heads.value && heads.value.map((head) => <th>{head}</th>)}</tr>
        </thead>
        <tbody>
          {unref(datasource).map((data, idx) => {
            return (
              <tr key={data.key || idx}>
                {Object.values(data).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
