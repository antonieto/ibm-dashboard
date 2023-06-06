import http from 'k6/http';
import { check, sleep } from 'k6';

const IBM_DASHBOARD_URL = 'http://localhost:3000';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
	const cookie = 'auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YmEyNWNjMi05MGYwLTQ0ZjctOTA5YS0yNzU2MjNkMTJiMmEiLCJpYXQiOjE2ODYxNzYwOTMsImV4cCI6MTY4NjI2MjQ5M30.2D8SZfY1XtvyNdH9rJMwfVjg7kZvcCFUlVmVkYrbUiY;'

	const res = http.get(`${IBM_DASHBOARD_URL}/api/trpc/charts.getChartData?batch=1&input=%7B%220%22%3A%7B%22chartId%22%3A%22bab3d8da-cb55-4e9e-bdf8-79ccdfa7f345%22%7D%7D`, {
		headers: {
			'Cookie': cookie,
		}
	});
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
