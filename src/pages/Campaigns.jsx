import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {
  Send as SendIcon,
  FileDownload as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const Campaigns = () => {
  const [campaignData, setCampaignData] = useState({
    message: '',
    audience: 'all',
  });

  const campaigns = [
    {
      id: 'CAMP-001',
      message: 'Summer Sale - 50% off on all items!',
      audience: 'All Customers',
      sent: 1000,
      opened: 850,
      replied: 120,
      date: '2024-04-18',
    },
    {
      id: 'CAMP-002',
      message: 'New menu items available!',
      audience: 'High Engagement',
      sent: 500,
      opened: 400,
      replied: 80,
      date: '2024-04-17',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle campaign creation
    console.log('Campaign created:', campaignData);
  };

  return (
    <div className="p-6 ml-64 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Marketing Campaigns</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-[#25D366] text-white rounded-lg flex items-center">
            <DownloadIcon className="mr-2" />
            Export Stats
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Create New Campaign</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              multiline
              rows={4}
              label="WhatsApp Message"
              value={campaignData.message}
              onChange={(e) => setCampaignData({ ...campaignData, message: e.target.value })}
            />

            <FormControl fullWidth>
              <InputLabel>Target Audience</InputLabel>
              <Select
                value={campaignData.audience}
                label="Target Audience"
                onChange={(e) => setCampaignData({ ...campaignData, audience: e.target.value })}
              >
                <MenuItem value="all">All Customers</MenuItem>
                <MenuItem value="high">High Engagement</MenuItem>
                <MenuItem value="low">Low Engagement</MenuItem>
                <MenuItem value="new">New Customers</MenuItem>
              </Select>
            </FormControl>

            {/* Removed the DateTimePicker and date handling */}

            <Button
              type="submit"
              variant="contained"
              className="bg-[#25D366] hover:bg-[#128C7E]"
              startIcon={<SendIcon />}
            >
              Launch Campaign
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Campaign History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Message</th>
                  <th className="text-left py-3 px-4">Audience</th>
                  <th className="text-left py-3 px-4">Sent</th>
                  <th className="text-left py-3 px-4">Opened</th>
                  <th className="text-left py-3 px-4">Replied</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{campaign.message}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                        {campaign.audience}
                      </span>
                    </td>
                    <td className="py-3 px-4">{campaign.sent}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <CheckCircleIcon className="text-green-500 mr-1" />
                        {campaign.opened}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <CheckCircleIcon className="text-blue-500 mr-1" />
                        {campaign.replied}
                      </div>
                    </td>
                    <td className="py-3 px-4">{campaign.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
