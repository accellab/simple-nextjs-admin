import { Request } from '../../http/http';

export default async (req, res) => {
  let response;
  const method = req.method;
  let url;
  switch (method) {
    case 'GET':
      url = '/api/static/file/translation';
      const params = {
        format: 'array',
      };
      response = await Request(url, 'GET', params, {}, {});
      res.statusCode = 200;
      res.json(response.data);
      return;
    case 'PATCH':
      url = '/api/cron/602bb7dc-1221-4fa7-9650-e10454255158';
      const body = JSON.parse(req.body);
      response = await Request(url, 'PATCH', {}, body, {});
      res.statusCode = 200;
      res.json({
        message: response,
      });
      res.return;
  }
};
