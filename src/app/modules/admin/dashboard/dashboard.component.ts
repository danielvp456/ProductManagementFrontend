import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  statistics = {
    totalUsers: 150,
    totalProducts: 75,
    totalSales: 1234,
    revenue: 45678
  };

  recentActivities = [
    {
      type: 'sale',
      description: 'New sale completed',
      time: '2 minutes ago',
      icon: '💰',
      iconBg: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      type: 'product',
      description: 'New product added',
      time: '15 minutes ago',
      icon: '📦',
      iconBg: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      type: 'user',
      description: 'New user registered',
      time: '1 hour ago',
      icon: '👤',
      iconBg: 'bg-purple-100 dark:bg-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  ngOnInit(): void {
    // Aquí se cargarían los datos reales desde el servicio
  }
} 