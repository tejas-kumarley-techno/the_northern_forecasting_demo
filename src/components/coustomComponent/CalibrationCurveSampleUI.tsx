import React from "react";
import { Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";

interface CalibrationCurveSampleUIProps {
  transformedData: any[];
}

const CalibrationCurveSampleUI: React.FC<CalibrationCurveSampleUIProps> = ({
  transformedData,
}) => {
  if (!transformedData || transformedData.length === 0) {
    return <div>No data available</div>;
  }

  const generateColumns = (): ColumnsType<any> => {
    const keys = Object.keys(transformedData[0]);

    return keys.map((key) => {
      return {
        title: key.replace(/_/g, " "),
        dataIndex: key,
        key: key,
        sorter: (a: any, b: any) => {
          const valA = a[key];
          const valB = b[key];
          if (typeof valA === "number" && typeof valB === "number") {
            return valA - valB;
          }
          if (typeof valA === "string" && typeof valB === "string") {
            return valA.localeCompare(valB);
          }
          return 0;
        },
        render: (value: any) => {
          // Status column
          if (key === "overallPass") {
            return (
              <Tag color={value ? "green" : "red"}>
                {value ? "Passed" : "Failed"}
              </Tag>
            );
          }

          // Sample type column
          if (key === "sampleType") {
            let color = "default";
            if (value === "Standard") color = "blue";
            else if (value === "Unknown") color = "orange";
            else if (value === "CCV") color = "green";
            return <Tag color={color}>{value}</Tag>;
          }

          // Format concentration fields
          if (key.toLowerCase().includes("concentration") && value != null) {
            return typeof value === "number"
              ? value.toFixed(2)
              : value.toString();
          }

          // Failure Reasons & Coelution Reasons
          if (key === "Failure_Reasons" || key === "Coelution_Reasons") {
            const isPass = value === "PASS" || !value;
            return isPass ? (
              <Tag color="green">PASS</Tag>
            ) : (
              <Tooltip
                title={<pre style={{ whiteSpace: "pre-wrap" }}>{value}</pre>}
              >
                <Tag icon={<InfoCircleOutlined />} color="magenta">
                  View
                </Tag>
              </Tooltip>
            );
          }
          if (typeof value === "boolean") {
            return value ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#ff4d4f" />
            );
          }

          return value ?? "–";
        },
      };
    });
  };

  const columns = generateColumns();

  return (
    <div className="p-6">
      <Table
        columns={columns}
        dataSource={transformedData.map((item) => ({
          ...item,
          key: item.id || item["File Name"] || Math.random().toString(),
        }))}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default CalibrationCurveSampleUI;
