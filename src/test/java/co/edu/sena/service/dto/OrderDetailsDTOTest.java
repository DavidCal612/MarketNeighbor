package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OrderDetailsDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderDetailsDTO.class);
        OrderDetailsDTO orderDetailsDTO1 = new OrderDetailsDTO();
        orderDetailsDTO1.setId(1L);
        OrderDetailsDTO orderDetailsDTO2 = new OrderDetailsDTO();
        assertThat(orderDetailsDTO1).isNotEqualTo(orderDetailsDTO2);
        orderDetailsDTO2.setId(orderDetailsDTO1.getId());
        assertThat(orderDetailsDTO1).isEqualTo(orderDetailsDTO2);
        orderDetailsDTO2.setId(2L);
        assertThat(orderDetailsDTO1).isNotEqualTo(orderDetailsDTO2);
        orderDetailsDTO1.setId(null);
        assertThat(orderDetailsDTO1).isNotEqualTo(orderDetailsDTO2);
    }
}
