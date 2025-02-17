import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { ProductService } from '../../../core/services/product.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  statistics = {
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    revenue: 0
  };

  recentActivities: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;

    // Usar forkJoin para hacer todas las peticiones en paralelo
    forkJoin({
      users: this.userService.getAllUsers(),
      products: this.productService.getAllProducts(),
      invoices: this.invoiceService.getAllInvoices()
    }).subscribe({
      next: (data) => {
        // Calcular estadísticas
        this.statistics.totalUsers = data.users.length;
        this.statistics.totalProducts = data.products.length;
        this.statistics.totalSales = data.invoices.length;
        this.statistics.revenue = data.invoices.reduce((sum, invoice) => sum + invoice.total, 0);

        // Generar actividades recientes basadas en las últimas facturas
        this.generateRecentActivities(data.invoices);
        
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los datos del dashboard';
        this.isLoading = false;
        console.error('Dashboard loading error:', error);
      }
    });
  }

  private generateRecentActivities(invoices: any[]): void {
    // Ordenar facturas por fecha de compra (más recientes primero)
    const sortedInvoices = [...invoices].sort((a, b) => 
      new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
    );

    // Tomar las 3 más recientes
    this.recentActivities = sortedInvoices.slice(0, 3).map(invoice => ({
      type: 'sale',
      description: `Venta a ${invoice.user.name} por $${invoice.total.toFixed(2)}`,
      time: this.getTimeAgo(new Date(invoice.purchaseDate)),
      icon: '💰',
      iconBg: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400'
    }));
  }

  private getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutos atrás`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} horas atrás`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} días atrás`;
    }
  }
} 