'use client';
import {
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {    date: 'Aug 01',    'Groceries': 2100.2,    'Pleasure': 4434.1,    'Admin': 7943.2,  },  {    date: 'Aug 02',    'Groceries': 2943.0,    'Pleasure': 4954.1,    'Admin': 8954.1,  },  {    date: 'Aug 03',    'Groceries': 4889.5,    'Pleasure': 6100.2,    'Admin': 9123.7,  },  {    date: 'Aug 04',    'Groceries': 3909.8,    'Pleasure': 4909.7,    'Admin': 7478.4,  },  {    date: 'Aug 05',    'Groceries': 5778.7,    'Pleasure': 7103.1,    'Admin': 9504.3,  },  {    date: 'Aug 06',    'Groceries': 5900.9,    'Pleasure': 7534.3,    'Admin': 9943.4,  },  {    date: 'Aug 07',    'Groceries': 4129.4,    'Pleasure': 7412.1,    'Admin': 10112.2,  },  {    date: 'Aug 08',    'Groceries': 6021.2,    'Pleasure': 7834.4,    'Admin': 10290.2,  },  {    date: 'Aug 09',    'Groceries': 6279.8,    'Pleasure': 8159.1,    'Admin': 10349.6,  },  {    date: 'Aug 10',    'Groceries': 6224.5,    'Pleasure': 8260.6,    'Admin': 10415.4,  },  {    date: 'Aug 11',    'Groceries': 6380.6,    'Pleasure': 8965.3,    'Admin': 10636.3,  },  {    date: 'Aug 12',    'Groceries': 6414.4,    'Pleasure': 7989.3,    'Admin': 10900.5,  },  {    date: 'Aug 13',    'Groceries': 6540.1,    'Pleasure': 7839.6,    'Admin': 11040.4,  },  {    date: 'Aug 14',    'Groceries': 6634.4,    'Pleasure': 7343.8,    'Admin': 11390.5,  },  {    date: 'Aug 15',    'Groceries': 7124.6,    'Pleasure': 6903.7,    'Admin': 11423.1,  },  {    date: 'Aug 16',    'Groceries': 7934.5,    'Pleasure': 6273.6,    'Admin': 12134.4,  },  {    date: 'Aug 17',    'Groceries': 10287.8,    'Pleasure': 5900.3,    'Admin': 12034.4,  },  {    date: 'Aug 18',    'Groceries': 10323.2,    'Pleasure': 5732.1,    'Admin': 11011.7,  },  {    date: 'Aug 19',    'Groceries': 10511.4,    'Pleasure': 5523.1,    'Admin': 11834.8,  },  {    date: 'Aug 20',    'Groceries': 11043.9,    'Pleasure': 5422.3,    'Admin': 12387.1,  },  {    date: 'Aug 21',    'Groceries': 6700.7,    'Pleasure': 5334.2,    'Admin': 11032.2,  },  {    date: 'Aug 22',    'Groceries': 6900.8,    'Pleasure': 4943.4,    'Admin': 10134.2,  },  {    date: 'Aug 23',    'Groceries': 7934.5,    'Pleasure': 4812.1,    'Admin': 9921.2,  },  {    date: 'Aug 24',    'Groceries': 9021.0,    'Pleasure': 2729.1,    'Admin': 10549.8,  },  {    date: 'Aug 25',    'Groceries': 9198.2,    'Pleasure': 2178.0,    'Admin': 10968.4,  },  {    date: 'Aug 26',    'Groceries': 9557.1,    'Pleasure': 2158.3,    'Admin': 11059.1,  },  {    date: 'Aug 27',    'Groceries': 9959.8,    'Pleasure': 2100.8,    'Admin': 11903.6,  },  {    date: 'Aug 28',    'Groceries': 10034.6,    'Pleasure': 2934.4,    'Admin': 12143.3,  },  {    date: 'Aug 29',    'Groceries': 10243.8,    'Pleasure': 3223.4,    'Admin': 12930.1,  },  {    date: 'Aug 30',    'Groceries': 10078.5,    'Pleasure': 3779.1,    'Admin': 13420.5,  },  {    date: 'Aug 31',    'Groceries': 11134.6,    'Pleasure': 4190.3,    'Admin': 14443.2,  },  {    date: 'Sep 01',    'Groceries': 12347.2,    'Pleasure': 4839.1,    'Admin': 14532.1,  },  {    date: 'Sep 02',    'Groceries': 12593.8,    'Pleasure': 5153.3,    'Admin': 14283.5,  },  {    date: 'Sep 03',    'Groceries': 12043.4,    'Pleasure': 5234.8,    'Admin': 14078.9,  },  {    date: 'Sep 04',    'Groceries': 12144.9,    'Pleasure': 5478.4,    'Admin': 13859.7,  },  {    date: 'Sep 05',    'Groceries': 12489.5,    'Pleasure': 5741.1,    'Admin': 13539.2,  },  {    date: 'Sep 06',    'Groceries': 12748.7,    'Pleasure': 6743.9,    'Admin': 13643.2,  },  {    date: 'Sep 07',    'Groceries': 12933.2,    'Pleasure': 7832.8,    'Admin': 14629.2,  },  {    date: 'Sep 08',    'Groceries': 13028.8,    'Pleasure': 8943.2,    'Admin': 13611.2,  },  {    date: 'Sep 09',    'Groceries': 13412.4,    'Pleasure': 9932.2,    'Admin': 12515.2,  },  {    date: 'Sep 10',    'Groceries': 13649.0,    'Pleasure': 10139.2,    'Admin': 11143.8,  },  {    date: 'Sep 11',    'Groceries': 13748.5,    'Pleasure': 10441.2,    'Admin': 8929.2,  },  {    date: 'Sep 12',    'Groceries': 13148.1,    'Pleasure': 10933.8,    'Admin': 8943.2,  },  {    date: 'Sep 13',    'Groceries': 12839.6,    'Pleasure': 11073.4,    'Admin': 7938.3,  },  {    date: 'Sep 14',    'Groceries': 12428.2,    'Pleasure': 11128.3,    'Admin': 7533.4,  },  {    date: 'Sep 15',    'Groceries': 12012.8,    'Pleasure': 11412.3,    'Admin': 7100.4,  },  {    date: 'Sep 16',    'Groceries': 11801.3,    'Pleasure': 10501.1,    'Admin': 6532.1,  },  {    date: 'Sep 17',    'Groceries': 10102.9,    'Pleasure': 8923.3,    'Admin': 4332.8,  },  {    date: 'Sep 18',    'Groceries': 12132.5,    'Pleasure': 10212.1,    'Admin': 7847.4,  },  {    date: 'Sep 19',    'Groceries': 12901.1,    'Pleasure': 10101.7,    'Admin': 7223.3,  },  {    date: 'Sep 20',    'Groceries': 13132.6,    'Pleasure': 12132.3,    'Admin': 6900.2,  },  {    date: 'Sep 21',    'Groceries': 14132.2,    'Pleasure': 13212.5,    'Admin': 5932.2,  },  {    date: 'Sep 22',    'Groceries': 14245.8,    'Pleasure': 12163.4,    'Admin': 5577.1,  },  {    date: 'Sep 23',    'Groceries': 14328.3,    'Pleasure': 10036.1,    'Admin': 5439.2,  },  {    date: 'Sep 24',    'Groceries': 14949.9,    'Pleasure': 8985.1,    'Admin': 4463.1,  },  {    date: 'Sep 25',    'Groceries': 15967.5,    'Pleasure': 9700.1,    'Admin': 4123.2,  },  {    date: 'Sep 26',    'Groceries': 17349.3,    'Pleasure': 10943.4,    'Admin': 3935.1,  },
];

const summary = [
  {
    name: 'Groceries',
    value: '$21,349.36',
    invested: '$19,698.65',
    cashflow: '$14,033.74',
    gain: '+$11,012.39',
    realized: '+$177.48',
    dividends: '+$490.97',
    bgColor: 'bg-blue-500',
    changeType: 'positive',
  },
  {
    name: 'Pleasure',
    value: '$25,943.43',
    invested: '$23,698.65',
    cashflow: '$11,033.74',
    gain: '+$3,012.39',
    realized: '+$565.41',
    dividends: '+$290.97',
    bgColor: 'bg-violet-500',
    changeType: 'positive',
  },
  {
    name: 'Admin',
    value: '$9,443.46',
    invested: '$14,698.65',
    cashflow: '$2,033.74',
    gain: '-$5,012.39',
    realized: '-$634.42',
    dividends: '-$990.97',
    bgColor: 'bg-fuchsia-500',
    changeType: 'negative',
  },
];

const valueFormatter = (number: number | bigint) =>
  `€${Intl.NumberFormat('eur').format(number).toString()}`;

export default function Example() {
  return (
    <>
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Spending trends per category
      </h3>
      <p className="mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        $32,227.40
      </p>
      <p className="mt-1 text-tremor-default font-medium">
        <span className="text-emerald-700 dark:text-emerald-500">
          +$430.90 (4.1%)
        </span>{' '}
        <span className="font-normal text-tremor-content dark:text-dark-tremor-content">
          Past 24 hours
        </span>
      </p>
      <LineChart
        data={data}
        index="date"
        categories={[
          'Groceries',
          'Pleasure',
          'Admin',
        ]}
        colors={['blue', 'violet', 'fuchsia']}
        valueFormatter={valueFormatter}
        yAxisWidth={55}
        onValueChange={() => {}}
        className="mt-6 hidden h-96 sm:block"
      />
      <LineChart
        data={data}
        index="date"
        categories={[
          'Groceries',
          'Pleasure',
          'Admin',
        ]}
        colors={['blue', 'violet', 'fuchsia']}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        className="mt-6 h-72 sm:hidden"
      />
      <Table className="mt-8">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Value
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Invested
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Cashflow
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Gain
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Realized
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Dividends
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summary.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                <div className="flex space-x-3">
                  <span
                    className={classNames(item.bgColor, 'w-1 shrink-0 rounded')}
                    aria-hidden={true}
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{item.value}</TableCell>
              <TableCell className="text-right">{item.invested}</TableCell>
              <TableCell className="text-right">{item.cashflow}</TableCell>
              <TableCell className="text-right">
                <span
                  className={classNames(
                    item.changeType === 'positive'
                      ? 'text-emerald-700 dark:text-emerald-500'
                      : 'text-red-700 dark:text-red-500',
                  )}
                >
                  {item.gain}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={classNames(
                    item.changeType === 'positive'
                      ? 'text-emerald-700 dark:text-emerald-500'
                      : 'text-red-700 dark:text-red-500',
                  )}
                >
                  {item.realized}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={classNames(
                    item.changeType === 'positive'
                      ? 'text-emerald-700 dark:text-emerald-500'
                      : 'text-red-700 dark:text-red-500',
                  )}
                >
                  {item.dividends}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}