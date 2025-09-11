const dashboardData = {
  CSPM: [
    { id: 1, title: "Cloud Accounts", text: "Shows all connected accounts" },
    { id: 2, title: "Cloud Account Risk Assessment", text: "Risk levels across accounts" }
  ],
  CWPP: [
    { id: 3, title: "Top 5 Namespace Specific Alerts", text: "Alerts sorted by namespace" },
    { id: 4, title: "Workload Alerts", text: "Workload-level alert summary" }
  ],
  Image: [
    { id: 5, title: "Image Risk Assessment", text: "Shows vulnerabilities in images" },
    { id: 6, title: "Image Security Issues", text: "Issues across scanned images" }
  ],
  Ticket: [
    { id: 7, title: "Ticket Summary", text: "Tickets raised & resolved" }
  ]
};

export default dashboardData;
