export default function RecInfoTable() {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div className="text-xl">ตารางข้อมูลเจ้าของสัตว์</div>
        <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300">
          <option value="moo1">หมู่ 1</option>
          <option value="moo2">หมู่ 2</option>
        </select>
      </div>
      <div className="overflow-x-auto overflow-y-scroll max-h-96 w-full p-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>ชื่อ</th>
              <th>สกุล</th>
              <th>จำนวนสุนัข</th>
              <th>จำนวนแมว</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>2</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>3</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>4</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>5</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>2</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>3</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>4</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>5</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>2</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>3</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>4</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
            {/* row 1 */}
            <tr>
              <th>5</th>
              <td>สมหมาย</td>
              <td>สมร</td>
              <td>5</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
